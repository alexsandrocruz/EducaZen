using System;
using System.Threading.Tasks;
using EstudaZen.Students.Quizzes;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

namespace EstudaZen.Controllers.Students;

[RemoteService]
[Route("api/app/student-quiz")]
public class StudentQuizController : AbpControllerBase, IStudentQuizAppService
{
    private readonly IStudentQuizAppService _studentQuizAppService;

    public StudentQuizController(IStudentQuizAppService studentQuizAppService)
    {
        _studentQuizAppService = studentQuizAppService;
    }

    [HttpGet("my-quizzes")]
    public Task<PagedResultDto<QuizDto>> GetMyQuizzesAsync(GetMyQuizzesInput input)
    {
        return _studentQuizAppService.GetMyQuizzesAsync(input);
    }

    [HttpPost("start")]
    public Task<QuizDto> StartQuizAsync(StartQuizDto input)
    {
        return _studentQuizAppService.StartQuizAsync(input);
    }

    [HttpGet("{quizId}/current-question")]
    public Task<QuizQuestionDto> GetCurrentQuestionAsync(Guid quizId)
    {
        return _studentQuizAppService.GetCurrentQuestionAsync(quizId);
    }

    [HttpPost("submit-answer")]
    public Task<SubmitAnswerResultDto> SubmitAnswerAsync(SubmitAnswerDto input)
    {
        return _studentQuizAppService.SubmitAnswerAsync(input);
    }

    [HttpGet("{quizId}/result")]
    public Task<QuizResultDto> GetQuizResultAsync(Guid quizId)
    {
        return _studentQuizAppService.GetQuizResultAsync(quizId);
    }

    [HttpPost("{quizId}/abandon")]
    public Task AbandonQuizAsync(Guid quizId)
    {
        return _studentQuizAppService.AbandonQuizAsync(quizId);
    }
}
