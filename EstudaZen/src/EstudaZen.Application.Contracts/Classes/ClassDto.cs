using System;
using Volo.Abp.Application.Dtos;
using EstudaZen.Classes;

namespace EstudaZen.Classes;

/// <summary>
/// DTO for Class entity
/// </summary>
public class ClassDto : FullAuditedEntityDto<Guid>
{
    public Guid? TenantId { get; set; }
    public Guid SchoolId { get; set; }
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public GradeLevel GradeLevel { get; set; }
    public Shift Shift { get; set; }
    public int SchoolYear { get; set; }
    public int? MaxStudents { get; set; }
    public bool IsActive { get; set; }
    public int StudentCount { get; set; } // Computed
}
