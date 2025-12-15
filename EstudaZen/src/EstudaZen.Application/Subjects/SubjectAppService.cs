using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace EstudaZen.Subjects;

public class SubjectAppService : 
    CrudAppService<
        Subject, 
        SubjectDto, 
        Guid, 
        PagedAndSortedResultRequestDto, 
        CreateUpdateSubjectDto>, 
    ISubjectAppService
{
    private readonly ISubjectRepository _subjectRepository;

    public SubjectAppService(ISubjectRepository subjectRepository) 
        : base(subjectRepository)
    {
        _subjectRepository = subjectRepository;
    }

    // Default CRUD implementation provided by base class is sufficient for basic needs
    // We can override methods here if custom business logic is needed
}
