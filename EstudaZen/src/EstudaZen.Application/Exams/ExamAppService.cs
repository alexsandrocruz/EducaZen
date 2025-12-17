using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Exams;

using EstudaZen.Questions;


[RemoteService(IsEnabled = true)]
public class ExamAppService : ApplicationService, IExamAppService
{
    private readonly IRepository<Exam, Guid> _examRepository;
    private readonly ExamMapper _examMapper = new();

    public ExamAppService(IRepository<Exam, Guid> examRepository)
    {
        _examRepository = examRepository;
    }

    public async Task<PagedResultDto<ExamDto>> GetListAsync(GetExamListDto input)
    {
        var query = await _examRepository.GetQueryableAsync();

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            var filter = input.Filter.ToLower();
            query = query.Where(x => x.Title.ToLower().Contains(filter) ||
                                     (x.Description != null && x.Description.ToLower().Contains(filter)));
        }

        if (input.SchoolId.HasValue)
        {
            query = query.Where(x => x.SchoolId == input.SchoolId.Value);
        }

        if (input.Type.HasValue)
        {
            query = query.Where(x => x.Type == input.Type.Value);
        }

        if (input.IsPublished.HasValue)
        {
            query = query.Where(x => x.IsPublished == input.IsPublished.Value);
        }

        var totalCount = query.Count();

        query = query
            .OrderByDescending(x => x.CreationTime)
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount);

        var items = query.ToList();
        var dtos = items.Select(_examMapper.Map).ToList();

        return new PagedResultDto<ExamDto>(totalCount, dtos);
    }

    public async Task<ExamDto> GetAsync(Guid id)
    {
        var entity = await _examRepository.GetAsync(id);
        return _examMapper.Map(entity);
    }

    public async Task<ExamDto> CreateAsync(CreateUpdateExamDto input)
    {
        var entity = new Exam(
            GuidGenerator.Create(),
            input.Title,
            input.Type,
            CurrentTenant.Id,
            input.SchoolId
        );

        entity.Description = input.Description;
        entity.Difficulty = input.Difficulty;
        entity.DurationMinutes = input.DurationMinutes;
        entity.AvailableFrom = input.AvailableFrom;
        entity.AvailableUntil = input.AvailableUntil;
        entity.ShowCorrectAnswers = input.ShowCorrectAnswers;
        entity.RandomizeQuestions = input.RandomizeQuestions;
        entity.RandomizeOptions = input.RandomizeOptions;

        await _examRepository.InsertAsync(entity, autoSave: true);

        return _examMapper.Map(entity);
    }

    public async Task<ExamDto> UpdateAsync(Guid id, CreateUpdateExamDto input)
    {
        var entity = await _examRepository.GetAsync(id);

        entity.SetTitle(input.Title);
        entity.Description = input.Description;
        entity.Type = input.Type;
        entity.Difficulty = input.Difficulty;
        entity.DurationMinutes = input.DurationMinutes;
        entity.AvailableFrom = input.AvailableFrom;
        entity.AvailableUntil = input.AvailableUntil;
        entity.ShowCorrectAnswers = input.ShowCorrectAnswers;
        entity.RandomizeQuestions = input.RandomizeQuestions;
        entity.RandomizeOptions = input.RandomizeOptions;
        entity.SchoolId = input.SchoolId;

        await _examRepository.UpdateAsync(entity, autoSave: true);

        return _examMapper.Map(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _examRepository.DeleteAsync(id);
    }

    [Route("api/app/exam/{id}/publish")]
    [HttpPost]
    public async Task<ExamDto> PublishAsync(Guid id)
    {
        var entity = await _examRepository.GetAsync(id);
        entity.Publish();
        await _examRepository.UpdateAsync(entity, autoSave: true);
        return _examMapper.Map(entity);
    }

    [Route("api/app/exam/{id}/unpublish")]
    [HttpPost]
    public async Task<ExamDto> UnpublishAsync(Guid id)
    {
        var entity = await _examRepository.GetAsync(id);
        entity.Unpublish();
        await _examRepository.UpdateAsync(entity, autoSave: true);
        return _examMapper.Map(entity);
    }

    [Route("api/app/exam/{id}/generate-questions")]
    [HttpPost]
    public async Task<ExamDto> GenerateQuestionsAsync(Guid id, GenerateExamQuestionsDto input)
    {
        var exam = await _examRepository.GetAsync(id);

        // Get question repository
        var questionRepo = LazyServiceProvider.LazyGetRequiredService<IRepository<Questions.Question, Guid>>();
        var allQuestions = await questionRepo.GetListAsync();

        // Filter questions
        var query = allQuestions.AsQueryable()
            .Where(q => q.IsPublished);

        if (input.SubjectId.HasValue)
            query = query.Where(q => q.SubjectId == input.SubjectId.Value);

        if (input.Year.HasValue)
            query = query.Where(q => q.Year == input.Year.Value);

        if (input.AvoidRecentlyUsed)
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-input.AvoidUsedInDays);
            query = query.Where(q => !q.LastUsedAt.HasValue || q.LastUsedAt < cutoffDate);
        }

        var availableQuestions = query.ToList();
        var selectedQuestions = new List<Questions.Question>();
        var random = new Random();

        if (input.SingleDifficulty.HasValue)
        {
            // Single difficulty mode
            var filtered = availableQuestions
                .Where(q => q.Difficulty == input.SingleDifficulty.Value)
                .OrderBy(_ => random.Next())
                .Take(input.TotalQuestions)
                .ToList();
            selectedQuestions.AddRange(filtered);
        }
        else
        {
            // Distribution mode
            var easyCount = (int)Math.Round(input.TotalQuestions * input.EasyPercent / 100.0);
            var mediumCount = (int)Math.Round(input.TotalQuestions * input.MediumPercent / 100.0);
            var hardCount = input.TotalQuestions - easyCount - mediumCount;

            var easyQuestions = availableQuestions
                .Where(q => q.Difficulty == QuestionDifficulty.Easy)
                .OrderBy(_ => random.Next())
                .Take(easyCount).ToList();

            var mediumQuestions = availableQuestions
                .Where(q => q.Difficulty == QuestionDifficulty.Medium)
                .OrderBy(_ => random.Next())
                .Take(mediumCount).ToList();

            var hardQuestions = availableQuestions
                .Where(q => q.Difficulty == QuestionDifficulty.Hard || 
                            q.Difficulty == QuestionDifficulty.Challenge)
                .OrderBy(_ => random.Next())
                .Take(hardCount).ToList();

            selectedQuestions.AddRange(easyQuestions);
            selectedQuestions.AddRange(mediumQuestions);
            selectedQuestions.AddRange(hardQuestions);
        }

        // Shuffle final selection
        selectedQuestions = selectedQuestions.OrderBy(_ => random.Next()).ToList();

        // Add to exam and update usage
        foreach (var question in selectedQuestions)
        {
            exam.AddQuestion(GuidGenerator.Create(), question.Id, input.PointsPerQuestion);
            question.LastUsedAt = DateTime.UtcNow;
            question.UsageCount++;
        }

        // Save questions with updated usage
        foreach (var question in selectedQuestions)
        {
            await questionRepo.UpdateAsync(question, autoSave: false);
        }

        await _examRepository.UpdateAsync(exam, autoSave: true);

        return _examMapper.Map(exam);
    }
    [Route("api/app/exam/{id}/questions")]
    [HttpGet]
    public async Task<List<ExamQuestionDto>> GetQuestionsAsync(Guid id)
    {
        var exam = await _examRepository.GetAsync(id, includeDetails: true);
        var questionIds = exam.Questions.Select(q => q.QuestionId).ToList();
        
        var questionRepo = LazyServiceProvider.LazyGetRequiredService<IRepository<Question, Guid>>();
        var questions = await questionRepo.GetListAsync(q => questionIds.Contains(q.Id));
        var questionMap = questions.ToDictionary(q => q.Id);

        return exam.Questions.OrderBy(q => q.Order).Select(eq => {
            var q = questionMap.GetValueOrDefault(eq.QuestionId);
            return new ExamQuestionDto
            {
                Id = eq.Id,
                ExamId = eq.ExamId,
                QuestionId = eq.QuestionId,
                Points = eq.Points,
                Order = eq.Order,
                Content = q?.Content ?? "Questão removida",
                Difficulty = q?.Difficulty ?? QuestionDifficulty.Medium,
                SubjectId = q?.SubjectId ?? Guid.Empty
            };
        }).ToList();
    }

    [Route("api/app/exam/{id}/question/{questionId}")]
    [HttpPost]
    public async Task AddQuestionAsync(Guid id, Guid questionId)
    {
        var exam = await _examRepository.GetAsync(id, includeDetails: true);
        var questionRepo = LazyServiceProvider.LazyGetRequiredService<IRepository<Question, Guid>>();
        var question = await questionRepo.GetAsync(questionId);

        // Add to exam (default points 10 if not specified)
        exam.AddQuestion(GuidGenerator.Create(), questionId, 10);
        
        // Update usage
        question.LastUsedAt = DateTime.UtcNow;
        question.UsageCount++;
        
        await questionRepo.UpdateAsync(question, autoSave: false);
        await _examRepository.UpdateAsync(exam, autoSave: true);
    }

    [Route("api/app/exam/{id}/question/{questionId}")]
    [HttpDelete]
    public async Task RemoveQuestionAsync(Guid id, Guid questionId)
    {
        var exam = await _examRepository.GetAsync(id, includeDetails: true);
        exam.RemoveQuestion(questionId);
        await _examRepository.UpdateAsync(exam, autoSave: true);
    }
}
