using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Schools;

public class SchoolDto : AuditedEntityDto<Guid>
{
    public Guid? TenantId { get; set; }
    public string Name { get; set; } = null!;
    public string? Code { get; set; }
    public string? CNPJ { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; }
}
