using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Users;
using EstudaZen.Exams;
using EstudaZen.Questions;

namespace EstudaZen.Exams;

public class ExamSessionAppService : ApplicationService, IExamSessionAppService
{
    private readonly IExamSessionRepository _examSessionRepository;
    private readonly IExamRepository _examRepository;
    private readonly IQuestionRepository _questionRepository;
    private readonly ExamSessionMapper _mapper = new();

    public ExamSessionAppService(
        IExamSessionRepository examSessionRepository,
        IExamRepository examRepository,
        IQuestionRepository questionRepository)
    {
        _examSessionRepository = examSessionRepository;
        _examRepository = examRepository;
        _questionRepository = questionRepository;
    }

    public async Task<ExamSessionDto> StartExamAsync(Guid examId)
    {
        var studentId = CurrentUser.GetId();

        // Check if exam exists and is available
        var exam = await _examRepository.GetAsync(examId);
        if (!exam.IsAvailable())
        {
            throw new BusinessException("EstudaZen:ExamNotAvailable");
        }

        // Check if student already has an active session
        var activeSession = await _examSessionRepository.GetActiveSessionAsync(studentId, examId);
        if (activeSession != null)
        {
            throw new BusinessException("EstudaZen:ExamSessionAlreadyInProgress");
        }

        // Create new session
        var session = new ExamSession(
            GuidGenerator.Create(),
            examId,
            studentId,
            exam.TotalPoints
        );

        await _examSessionRepository.InsertAsync(session, autoSave: true);

        return _mapper.Map(session);
    }

    public async Task<ExamSessionDto?> GetMyActiveSessionAsync(Guid examId)
    {
        var studentId = CurrentUser.GetId();
        var session = await _examSessionRepository.GetActiveSessionAsync(studentId, examId);
        return session != null ? _mapper.Map(session) : null;
    }

    public async Task<List<ExamSessionDto>> GetMySessionsAsync()
    {
        var studentId = CurrentUser.GetId();
        var sessions = await _examSessionRepository.GetStudentSessionsAsync(studentId);
        return sessions.Select(_mapper.Map).ToList();
    }

    public async Task<ExamAnswerDto> SubmitAnswerAsync(Guid sessionId, SubmitAnswerDto input)
    {
        var session = await _examSessionRepository.GetAsync(sessionId);

        // Verify session belongs to current user
        if (session.StudentId != CurrentUser.GetId())
        {
            throw new BusinessException("EstudaZen:UnauthorizedExamAccess");
        }

        // Get the question to determine correct answer
        var question = await _questionRepository.GetAsync(input.QuestionId);
        var correctAnswer = question.Answers.FirstOrDefault(a => a.IsCorrect);
        var isCorrect = input.SelectedAnswerId.HasValue && 
                       correctAnswer != null && 
                       input.SelectedAnswerId == correctAnswer.Id;

        // Submit the answer
        session.SubmitAnswer(
            GuidGenerator.Create(),
            input.QuestionId,
            input.SelectedAnswerId,
            isCorrect
        );

        // Update time spent if provided
        var answer = session.Answers.Last();
        if (input.TimeSpentSeconds > 0)
        {
            answer.SetTimeSpent(input.TimeSpentSeconds);
        }

        await _examSessionRepository.UpdateAsync(session, autoSave: true);

        return _mapper.Map(answer);
    }

    public async Task<ExamSessionDto> FinishExamAsync(Guid sessionId)
    {
        var session = await _examSessionRepository.GetAsync(sessionId);

        // Verify session belongs to current user
        if (session.StudentId != CurrentUser.GetId())
        {
            throw new BusinessException("EstudaZen:UnauthorizedExamAccess");
        }

        session.Complete();
        await _examSessionRepository.UpdateAsync(session, autoSave: true);

        return _mapper.Map(session);
    }

    public async Task<ExamSessionDto> AbandonExamAsync(Guid sessionId)
    {
        var session = await _examSessionRepository.GetAsync(sessionId);

        // Verify session belongs to current user
        if (session.StudentId != CurrentUser.GetId())
        {
            throw new BusinessException("EstudaZen:UnauthorizedExamAccess");
        }

        session.Abandon();
        await _examSessionRepository.UpdateAsync(session, autoSave: true);

        return _mapper.Map(session);
    }

    public async Task<ExamSessionDetailDto> GetSessionDetailAsync(Guid sessionId)
    {
        var session = await _examSessionRepository.GetSessionWithAnswersAsync(sessionId);
        
        if (session == null)
        {
            throw new EntityNotFoundException(typeof(ExamSession), sessionId);
        }

        // Verify session belongs to current user
        if (session.StudentId != CurrentUser.GetId())
        {
            throw new BusinessException("EstudaZen:UnauthorizedExamAccess");
        }

        return _mapper.MapToDetail(session);
    }
}
