using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Schools;

/// <summary>
/// Represents a school within a tenant (prefeitura)
/// </summary>
public class School : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// School name
    /// </summary>
    public string Name { get; private set; } = null!;

    /// <summary>
    /// Official school code (INEP or local)
    /// </summary>
    public string? Code { get; set; }

    /// <summary>
    /// School CNPJ
    /// </summary>
    public string? CNPJ { get; set; }

    /// <summary>
    /// School address (street)
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// City
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// State (UF)
    /// </summary>
    public string? State { get; set; }

    /// <summary>
    /// ZIP code (CEP)
    /// </summary>
    public string? ZipCode { get; set; }

    /// <summary>
    /// Contact phone
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// Contact email
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// Whether the school is active
    /// </summary>
    public bool IsActive { get; set; } = true;

    protected School() { }

    public School(Guid id, string name, Guid? tenantId = null) : base(id)
    {
        TenantId = tenantId;
        SetName(name);
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("School name cannot be empty", nameof(name));

        Name = name.Trim();
    }
}
