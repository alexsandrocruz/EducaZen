using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Questions;

/// <summary>
/// Repository for Question aggregate
/// </summary>
public interface IQuestionRepository : IRepository<Question, Guid>
{
    Task<List<Question>> GetListWithAnswersAsync(
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        bool? isPublished = null,
        string? searchTerm = null,
        int skipCount = 0,
        int maxResultCount = 10,
        CancellationToken cancellationToken = default);

    Task<long> GetCountAsync(
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        bool? isPublished = null,
        string? searchTerm = null,
        CancellationToken cancellationToken = default);

    Task<List<Question>> GetRandomQuestionsAsync(
        int count,
        Guid? subjectId = null,
        QuestionDifficulty? difficulty = null,
        List<Guid>? excludeIds = null,
        CancellationToken cancellationToken = default);

    Task<Question?> GetWithAnswersAsync(Guid id, CancellationToken cancellationToken = default);
}
