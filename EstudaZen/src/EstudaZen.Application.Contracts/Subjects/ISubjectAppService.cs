using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Subjects;

/// <summary>
/// Application service interface for Subject CRUD operations
/// </summary>
public interface ISubjectAppService : 
    ICrudAppService<
        SubjectDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateSubjectDto>
{
}
