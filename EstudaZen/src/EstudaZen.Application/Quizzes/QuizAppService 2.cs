using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Questions;
using EstudaZen.Students;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace EstudaZen.Quizzes;

public class QuizAppService : ApplicationService, IQuizAppService
{
    private readonly IQuizRepository _quizRepository;
    private readonly IQuestionRepository _questionRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly QuizMapper _quizMapper;
    private readonly ICurrentUser _currentUser;

    public QuizAppService(
        IQuizRepository quizRepository,
        IQuestionRepository questionRepository,
        IStudentRepository studentRepository,
        QuizMapper quizMapper,
        ICurrentUser currentUser)
    {
        _quizRepository = quizRepository;
        _questionRepository = questionRepository;
        _studentRepository = studentRepository;
        _quizMapper = quizMapper;
        _currentUser = currentUser;
    }

    public async Task<QuizDto> StartQuizAsync(StartQuizDto input)
    {
        var student = await GetCurrentStudentAsync();

        // Check if there is an active quiz
        var activeQuiz = await _quizRepository.GetActiveQuizForStudentAsync(student.Id);
        if (activeQuiz != null)
        {
            // For now, abandon previous quiz automatically. 
            // In a better UX, we would ask user to resume or discard.
            activeQuiz.Abandon();
            await _quizRepository.UpdateAsync(activeQuiz);
        }

        // Fetch random questions
        var questions = await _questionRepository.GetRandomQuestionsAsync(
            input.QuestionCount,
            input.SubjectId,
            input.Difficulty);

        if (!questions.Any())
            throw new UserFriendlyException("Não encontramos questões suficientes com estes filtros para iniciar o quiz.");

        // Create new quiz
        var quiz = new Quiz(
            GuidGenerator.Create(),
            student.Id,
            questions.Count,
            input.SubjectId,
            input.Difficulty,
            CurrentTenant.Id);

        foreach (var question in questions)
        {
            quiz.AddQuestion(GuidGenerator.Create(), question.Id);
        }

        await _quizRepository.InsertAsync(quiz);

        return _quizMapper.Map(quiz);
    }

    public async Task<QuizDto?> GetActiveQuizAsync()
    {
        var student = await GetCurrentStudentAsync();
        var quiz = await _quizRepository.GetActiveQuizForStudentAsync(student.Id);
        return quiz != null ? _quizMapper.Map(quiz) : null;
    }

    public async Task<CurrentQuizQuestionDto?> GetCurrentQuestionAsync(Guid quizId)
    {
        var quiz = await _quizRepository.GetWithQuestionsAsync(quizId);
        if (quiz == null || quiz.Status != QuizStatus.InProgress) return null;

        var currentQuizQuestion = quiz.Questions
            .FirstOrDefault(q => q.Order == quiz.CurrentQuestionIndex);

        if (currentQuizQuestion == null) return null;

        var question = await _questionRepository.GetWithAnswersAsync(currentQuizQuestion.QuestionId);
        if (question == null) return null;

        return new CurrentQuizQuestionDto
        {
            QuestionNumber = quiz.CurrentQuestionIndex + 1,
            TotalQuestions = quiz.TotalQuestions,
            CurrentStreak = quiz.CurrentStreak,
            SubjectName = question.Subject?.Name ?? "Geral",
            SubjectColor = question.Subject?.ColorHex ?? "#ccc",
            Difficulty = question.Difficulty,
            Content = question.Content,
            MediaUrl = question.MediaUrl,
            Points = question.Points,
            TimeLimitSeconds = question.TimeLimitSeconds,
            Answers = question.Answers.OrderBy(a => a.Order).Select(a => new AnswerOptionDto
            {
                Id = a.Id,
                Content = a.Content,
                Letter = a.GetLetter()
            }).ToList()
        };
    }

    public async Task<AnswerResultDto> AnswerAsync(AnswerQuestionDto input)
    {
        var quiz = await _quizRepository.GetWithQuestionsAsync(input.QuizId);
        if (quiz == null) throw new UserFriendlyException("Quiz não encontrado.");

        var currentQuizQuestion = quiz.Questions.FirstOrDefault(q => q.Order == quiz.CurrentQuestionIndex);
        if (currentQuizQuestion == null) throw new UserFriendlyException("Erro no estado do quiz.");

        var question = await _questionRepository.GetWithAnswersAsync(currentQuizQuestion.QuestionId);
        if (question == null) throw new UserFriendlyException("Questão original não encontrada.");

        var selectedAnswer = question.Answers.FirstOrDefault(a => a.Id == input.SelectedAnswerId);
        var isCorrect = selectedAnswer?.IsCorrect ?? false;
        var correctAnswer = question.Answers.First(a => a.IsCorrect);

        // Process answer in domain domain
        var (correct, xpEarned) = quiz.AnswerCurrentQuestion(input.SelectedAnswerId, isCorrect, question.Points);

        // Update student stats
        var student = await _studentRepository.GetAsync(quiz.StudentId);
        if (isCorrect)
        {
            student.UpdateStreak();
            student.AddXp(xpEarned);
        }
        else
        {
            // Maintain streak logic is inside student for now, but daily streak is different from quiz streak
            // Quiz streak reset is handled inside Quiz entity
        }
        
        // If quiz completed, finalize stats
        if (quiz.Status == QuizStatus.Completed)
        {
            student.RecordQuizCompletion(quiz.CorrectAnswers);
        }

        await _quizRepository.UpdateAsync(quiz);
        await _studentRepository.UpdateAsync(student);

        return new AnswerResultDto
        {
            IsCorrect = isCorrect,
            XpEarned = xpEarned,
            CurrentStreak = quiz.CurrentStreak,
            CorrectAnswerId = correctAnswer.Id,
            Explanation = question.Explanation,
            QuizCompleted = quiz.Status == QuizStatus.Completed,
            CorrectAnswersCount = quiz.CorrectAnswers,
            TotalQuestionsAnswered = quiz.CurrentQuestionIndex // index is incremented after answer
        };
    }

    public async Task AbandonQuizAsync(Guid quizId)
    {
        var quiz = await _quizRepository.GetAsync(quizId);
        if (quiz != null && quiz.Status == QuizStatus.InProgress)
        {
            quiz.Abandon();
            await _quizRepository.UpdateAsync(quiz);
        }
    }

    public async Task<QuizDto> GetResultsAsync(Guid quizId)
    {
        var quiz = await _quizRepository.GetWithQuestionsAsync(quizId);
        return _quizMapper.Map(quiz);
    }

    private async Task<Student> GetCurrentStudentAsync()
    {
        if (!_currentUser.Id.HasValue)
            throw new Volo.Abp.Authorization.AbpAuthorizationException();

        var student = await _studentRepository.FindByUserIdAsync(_currentUser.Id.Value);
        if (student == null)
        {
            student = new Student(GuidGenerator.Create(), _currentUser.Id.Value, CurrentTenant.Id);
            await _studentRepository.InsertAsync(student);
        }
        return student;
    }
}
