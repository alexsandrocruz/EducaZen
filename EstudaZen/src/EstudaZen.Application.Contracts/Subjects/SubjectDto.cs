using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Subjects;

/// <summary>
/// DTO for Subject entity
/// </summary>
public class SubjectDto : FullAuditedEntityDto<Guid>
{
    public string Name { get; set; } = null!;
    public string IconName { get; set; } = "school";
    public string ColorHex { get; set; } = "#7C3AED";
    public string? EnemAreaCode { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
