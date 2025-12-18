using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Questions;
using EstudaZen.Quizzes;
using EstudaZen.Subjects;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;
using QuizDto = EstudaZen.Students.Quizzes.QuizDto;
using QuizQuestionDto = EstudaZen.Students.Quizzes.QuizQuestionDto;
using StartQuizDto = EstudaZen.Students.Quizzes.StartQuizDto;
using SubmitAnswerDto = EstudaZen.Students.Quizzes.SubmitAnswerDto;
using SubmitAnswerResultDto = EstudaZen.Students.Quizzes.SubmitAnswerResultDto;
using QuizResultDto = EstudaZen.Students.Quizzes.QuizResultDto;
using GetMyQuizzesInput = EstudaZen.Students.Quizzes.GetMyQuizzesInput;
using QuestionAnswerDto = EstudaZen.Students.Quizzes.QuestionAnswerDto;

namespace EstudaZen.Students;

public class StudentQuizAppService : ApplicationService, Quizzes.IStudentQuizAppService
{
    private readonly IQuizRepository _quizRepository;
    private readonly IRepository<Question, Guid> _questionRepository;
    private readonly IRepository<Student, Guid> _studentRepository;
    private readonly IRepository<Subject, Guid> _subjectRepository;
    private readonly ICurrentUser _currentUser;

    public StudentQuizAppService(
        IQuizRepository quizRepository,
        IRepository<Question, Guid> questionRepository,
        IRepository<Student, Guid> studentRepository,
        IRepository<Subject, Guid> subjectRepository,
        ICurrentUser currentUser)
    {
        _quizRepository = quizRepository;
        _questionRepository = questionRepository;
        _studentRepository = studentRepository;
        _subjectRepository = subjectRepository;
        _currentUser = currentUser;
    }

    public async Task<PagedResultDto<QuizDto>> GetMyQuizzesAsync(GetMyQuizzesInput input)
    {
        var student = await GetCurrentStudentAsync();

        var query = await _quizRepository.GetQueryableAsync();
        query = query.Where(q => q.StudentId == student.Id);

        // Filter by status if provided
        if (!string.IsNullOrWhiteSpace(input.Status))
        {
            if (Enum.TryParse<QuizStatus>(input.Status, true, out var status))
            {
                query = query.Where(q => q.Status == status);
            }
        }

        // Sort by start date descending
        query = query.OrderByDescending(q => q.StartedAt);

        var totalCount = await AsyncExecuter.CountAsync(query);
        var quizzes = await AsyncExecuter.ToListAsync(
            query.Skip(input.SkipCount).Take(input.MaxResultCount)
        );

        var quizDtos = quizzes.Select(q => MapToQuizDto(q)).ToList();

        return new PagedResultDto<QuizDto>(totalCount, quizDtos);
    }

    public async Task<QuizDto> StartQuizAsync(StartQuizDto input)
    {
        var student = await GetCurrentStudentAsync();

        // Check if student has an active quiz
        var activeQuiz = await _quizRepository.FirstOrDefaultAsync(
            q => q.StudentId == student.Id && q.Status == QuizStatus.InProgress
        );

        if (activeQuiz != null)
        {
            throw new UserFriendlyException("Você já tem um quiz em andamento. Complete ou abandone-o antes de iniciar um novo.");
        }

        // Get random questions based on filters
        var questions = await GetRandomQuestionsAsync(
            input.SubjectId,
            input.Difficulty,
            input.TotalQuestions
        );

        if (questions.Count < input.TotalQuestions)
        {
            throw new UserFriendlyException(
                $"Não há questões suficientes disponíveis. Encontradas: {questions.Count}, Solicitadas: {input.TotalQuestions}"
            );
        }

        // Create quiz
        var quiz = new Quiz(
            GuidGenerator.Create(),
            student.Id,
            input.TotalQuestions,
            input.SubjectId,
            input.Difficulty,
            CurrentTenant.Id
        );

        // Add questions to quiz
        foreach (var question in questions)
        {
            quiz.AddQuestion(GuidGenerator.Create(), question.Id);
        }

        await _quizRepository.InsertAsync(quiz, autoSave: true);

        return MapToQuizDto(quiz);
    }

    public async Task<QuizQuestionDto> GetCurrentQuestionAsync(Guid quizId)
    {
        var quiz = await GetQuizWithQuestionsAsync(quizId);
        var student = await GetCurrentStudentAsync();

        if (quiz.StudentId != student.Id)
        {
            throw new UserFriendlyException("Este quiz não pertence a você.");
        }

        if (quiz.Status != QuizStatus.InProgress)
        {
            throw new UserFriendlyException("Este quiz não está mais ativo.");
        }

        var currentQuizQuestion = quiz.Questions
            .OrderBy(q => q.Order)
            .Skip(quiz.CurrentQuestionIndex)
            .FirstOrDefault();

        if (currentQuizQuestion == null)
        {
            throw new UserFriendlyException("Não há mais questões disponíveis.");
        }

        var question = await _questionRepository.GetAsync(
            currentQuizQuestion.QuestionId,
            includeDetails: true
        );

        return MapToQuizQuestionDto(question, currentQuizQuestion);
    }

    public async Task<SubmitAnswerResultDto> SubmitAnswerAsync(SubmitAnswerDto input)
    {
        var quiz = await GetQuizWithQuestionsAsync(input.QuizId);
        var student = await GetCurrentStudentAsync();

        if (quiz.StudentId != student.Id)
        {
            throw new UserFriendlyException("Este quiz não pertence a você.");
        }

        if (quiz.Status != QuizStatus.InProgress)
        {
            throw new UserFriendlyException("Este quiz não está mais ativo.");
        }

        var question = await _questionRepository.GetAsync(
            input.QuestionId,
            includeDetails: true
        );

        var correctAnswer = question.Answers.FirstOrDefault(a => a.IsCorrect);
        if (correctAnswer == null)
        {
            throw new BusinessException("Questão sem resposta correta configurada.");
        }

        var isCorrect = input.SelectedAnswerId == correctAnswer.Id;
        var (_, xpEarned) = quiz.AnswerCurrentQuestion(
            input.SelectedAnswerId,
            isCorrect,
            question.Points
        );

        // Update student's total XP
        student.AddXp(xpEarned);
        await _studentRepository.UpdateAsync(student);

        await _quizRepository.UpdateAsync(quiz, autoSave: true);

        var result = new SubmitAnswerResultDto
        {
            IsCorrect = isCorrect,
            XpEarned = xpEarned,
            CurrentStreak = quiz.CurrentStreak,
            CorrectAnswerId = correctAnswer.Id,
            Explanation = question.Explanation,
            IsQuizComplete = quiz.Status == QuizStatus.Completed
        };

        // If not complete, get next question
        if (!result.IsQuizComplete)
        {
            var nextQuizQuestion = quiz.Questions
                .OrderBy(q => q.Order)
                .Skip(quiz.CurrentQuestionIndex)
                .FirstOrDefault();

            if (nextQuizQuestion != null)
            {
                var nextQuestion = await _questionRepository.GetAsync(
                    nextQuizQuestion.QuestionId,
                    includeDetails: true
                );
                result.NextQuestion = MapToQuizQuestionDto(nextQuestion, nextQuizQuestion);
            }
        }

        return result;
    }

    public async Task<QuizResultDto> GetQuizResultAsync(Guid quizId)
    {
        var quiz = await GetQuizWithQuestionsAsync(quizId);
        var student = await GetCurrentStudentAsync();

        if (quiz.StudentId != student.Id)
        {
            throw new UserFriendlyException("Este quiz não pertence a você.");
        }

        if (quiz.Status != QuizStatus.Completed)
        {
            throw new UserFriendlyException("Este quiz ainda não foi completado.");
        }

        var questionIds = quiz.Questions.Select(q => q.QuestionId).ToList();
        var questions = await _questionRepository.GetListAsync(
            q => questionIds.Contains(q.Id),
            includeDetails: true
        );

        var questionDtos = new List<QuizQuestionDto>();
        foreach (var quizQuestion in quiz.Questions.OrderBy(q => q.Order))
        {
            var question = questions.First(q => q.Id == quizQuestion.QuestionId);
            var dto = MapToQuizQuestionDto(question, quizQuestion);
            
            // Fill answered data
            dto.SelectedAnswerId = quizQuestion.SelectedAnswerId;
            dto.IsCorrect = quizQuestion.IsCorrect;
            dto.XpEarned = quizQuestion.XpEarned;
            
            // Show correct answers
            foreach (var answer in dto.Answers)
            {
                var originalAnswer = question.Answers.First(a => a.Id == answer.Id);
                answer.IsCorrect = originalAnswer.IsCorrect;
            }
            
            questionDtos.Add(dto);
        }

        return new QuizResultDto
        {
            QuizId = quiz.Id,
            TotalQuestions = quiz.TotalQuestions,
            CorrectAnswers = quiz.CorrectAnswers,
            TotalXpEarned = quiz.TotalXpEarned,
            HighestStreak = quiz.HighestStreak,
            AccuracyPercentage = quiz.GetAccuracy(),
            ElapsedTime = quiz.GetElapsedTime(),
            StartedAt = quiz.StartedAt,
            CompletedAt = quiz.CompletedAt!.Value,
            Questions = questionDtos
        };
    }

    public async Task AbandonQuizAsync(Guid quizId)
    {
        var quiz = await _quizRepository.GetAsync(quizId);
        var student = await GetCurrentStudentAsync();

        if (quiz.StudentId != student.Id)
        {
            throw new UserFriendlyException("Este quiz não pertence a você.");
        }

        if (quiz.Status != QuizStatus.InProgress)
        {
            throw new UserFriendlyException("Este quiz não está mais ativo.");
        }

        quiz.Abandon();
        await _quizRepository.UpdateAsync(quiz, autoSave: true);
    }

    #region Private Helper Methods

    private async Task<Student> GetCurrentStudentAsync()
    {
        if (!_currentUser.IsAuthenticated || _currentUser.Id == null)
        {
            throw new UserFriendlyException("Você precisa estar autenticado.");
        }

        var student = await _studentRepository.FirstOrDefaultAsync(
            s => s.UserId == _currentUser.Id.Value
        );

        if (student == null)
        {
            throw new UserFriendlyException("Estudante não encontrado.");
        }

        return student;
    }

    private async Task<Quiz> GetQuizWithQuestionsAsync(Guid quizId)
    {
        var quiz = await _quizRepository.GetWithQuestionsAsync(quizId);
        if (quiz == null)
        {
            throw new UserFriendlyException("Quiz não encontrado.");
        }
        return quiz;
    }

    private async Task<List<Question>> GetRandomQuestionsAsync(
        Guid? subjectId,
        QuestionDifficulty? difficulty,
        int count)
    {
        var query = await _questionRepository.GetQueryableAsync();
        
        // Only published questions
        query = query.Where(q => q.IsPublished);

        // Filter by subject if specified
        if (subjectId.HasValue)
        {
            query = query.Where(q => q.SubjectId == subjectId.Value);
        }

        // Filter by difficulty if specified
        if (difficulty.HasValue)
        {
            query = query.Where(q => q.Difficulty == difficulty.Value);
        }

        // Randomize and take count
        var questions = await AsyncExecuter.ToListAsync(query);
        return questions
            .OrderBy(_ => Guid.NewGuid())
            .Take(count)
            .ToList();
    }

    private QuizDto MapToQuizDto(Quiz quiz)
    {
        return new QuizDto
        {
            Id = quiz.Id,
            StudentId = quiz.StudentId,
            SubjectId = quiz.SubjectId,
            Difficulty = quiz.Difficulty,
            TotalQuestions = quiz.TotalQuestions,
            CorrectAnswers = quiz.CorrectAnswers,
            TotalXpEarned = quiz.TotalXpEarned,
            CurrentStreak = quiz.CurrentStreak,
            HighestStreak = quiz.HighestStreak,
            StartedAt = quiz.StartedAt,
            CompletedAt = quiz.CompletedAt,
            Status = quiz.Status.ToString(),
            CurrentQuestionIndex = quiz.CurrentQuestionIndex,
            AccuracyPercentage = quiz.GetAccuracy(),
            ElapsedTime = quiz.CompletedAt.HasValue ? quiz.GetElapsedTime() : null
        };
    }

    private QuizQuestionDto MapToQuizQuestionDto(Question question, QuizQuestion quizQuestion)
    {
        return new QuizQuestionDto
        {
            QuestionId = question.Id,
            Content = question.Content,
            MediaUrl = question.MediaUrl,
            Explanation = question.Explanation,
            Difficulty = question.Difficulty,
            Points = question.Points,
            Order = quizQuestion.Order,
            Answers = question.Answers
                .OrderBy(a => a.Order)
                .Select(a => new QuestionAnswerDto
                {
                    Id = a.Id,
                    Content = a.Content,
                    Order = a.Order
                    // IsCorrect is NOT shown until after answering
                })
                .ToList()
        };
    }

    #endregion
}
