using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Questions;

public class QuestionAppService : ApplicationService, IQuestionAppService
{
    private readonly IQuestionRepository _questionRepository;
    private readonly QuestionMapper _questionMapper;
    private readonly CreateQuestionDtoMapper _createQuestionDtoMapper;
    private readonly UpdateQuestionDtoMapper _updateQuestionDtoMapper;

    public QuestionAppService(
        IQuestionRepository questionRepository,
        QuestionMapper questionMapper,
        CreateQuestionDtoMapper createQuestionDtoMapper,
        UpdateQuestionDtoMapper updateQuestionDtoMapper)
    {
        _questionRepository = questionRepository;
        _questionMapper = questionMapper;
        _createQuestionDtoMapper = createQuestionDtoMapper;
        _updateQuestionDtoMapper = updateQuestionDtoMapper;
    }

    public async Task<QuestionDto> GetAsync(Guid id)
    {
        var question = await _questionRepository.GetWithAnswersAsync(id);
        if (question == null)
            throw new Volo.Abp.Domain.Entities.EntityNotFoundException(typeof(Question), id);

        return _questionMapper.Map(question);
    }

    public async Task<PagedResultDto<QuestionDto>> GetListAsync(GetQuestionListDto input)
    {
        var count = await _questionRepository.GetCountAsync(
            input.SubjectId,
            input.Difficulty,
            input.IsPublished,
            input.SearchTerm);

        var list = await _questionRepository.GetListWithAnswersAsync(
            input.SubjectId,
            input.Difficulty,
            input.IsPublished,
            input.SearchTerm,
            input.SkipCount,
            input.MaxResultCount);

        return new PagedResultDto<QuestionDto>(
            count,
            list.Select(q => _questionMapper.Map(q)).ToList()
        );
    }

    public async Task<QuestionDto> CreateAsync(CreateQuestionDto input)
    {
        var question = _createQuestionDtoMapper.Map(input);
        
        await _questionRepository.InsertAsync(question);

        return _questionMapper.Map(question);
    }

    public async Task<QuestionDto> UpdateAsync(Guid id, UpdateQuestionDto input)
    {
        var question = await _questionRepository.GetWithAnswersAsync(id);
        if (question == null)
            throw new Volo.Abp.Domain.Entities.EntityNotFoundException(typeof(Question), id);

        // Update basic properties
        question.SetContent(input.Content);
        question.SubjectId = input.SubjectId;
        question.Difficulty = input.Difficulty;
        question.TimeLimitSeconds = input.TimeLimitSeconds;
        question.Tags = input.Tags;
        question.Explanation = input.Explanation;
        question.MediaUrl = input.MediaUrl;
        question.IsPublished = input.IsPublished;

        // Update answers
        // 1. Remove deleted
        var inputAnswerIds = input.Answers.Where(a => a.Id.HasValue).Select(a => a.Id!.Value).ToList();
        var toRemove = question.Answers.Where(a => !inputAnswerIds.Contains(a.Id)).ToList();
        foreach (var answer in toRemove)
        {
            question.Answers.Remove(answer);
        }

        // 2. Update existing and add new
        int order = 0;
        foreach (var answerDto in input.Answers)
        {
            if (answerDto.Id.HasValue)
            {
                var existingAnswer = question.Answers.FirstOrDefault(a => a.Id == answerDto.Id.Value);
                if (existingAnswer != null)
                {
                    existingAnswer.SetContent(answerDto.Content);
                    existingAnswer.IsCorrect = answerDto.IsCorrect;
                    existingAnswer.Order = order++;
                }
            }
            else
            {
                question.AddAnswer(GuidGenerator.Create(), answerDto.Content, answerDto.IsCorrect);
                // Note: AddAnswer sets order automatically based on count, but we are iterating
                // so we might want to be careful. The question.AddAnswer implementation uses Count which is fine.
            }
        }

        await _questionRepository.UpdateAsync(question);

        return _questionMapper.Map(question);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _questionRepository.DeleteAsync(id);
    }
}
