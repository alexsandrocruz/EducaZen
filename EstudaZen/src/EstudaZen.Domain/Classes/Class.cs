using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Classes;

/// <summary>
/// Represents a student class/group within a school
/// </summary>
public class Class : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// School this class belongs to
    /// </summary>
    public Guid SchoolId { get; private set; }

    /// <summary>
    /// Class name (e.g., "3º Ano A", "Turma 2024")
    /// </summary>
    public string Name { get; private set; } = null!;

    /// <summary>
    /// Internal code (unique per school)
    /// </summary>
    public string Code { get; private set; } = null!;

    /// <summary>
    /// Grade level
    /// </summary>
    public GradeLevel GradeLevel { get; set; }

    /// <summary>
    /// Schedule shift
    /// </summary>
    public Shift Shift { get; set; }

    /// <summary>
    /// Academic year (e.g., 2024, 2025)
    /// </summary>
    public int SchoolYear { get; private set; }

    /// <summary>
    /// Maximum number of students (null = no limit)
    /// </summary>
    public int? MaxStudents { get; set; }

    /// <summary>
    /// Whether the class is active
    /// </summary>
    public bool IsActive { get; set; } = true;

    protected Class() { }

    public Class(
        Guid id,
        Guid schoolId,
        string name,
        string code,
        int schoolYear,
        GradeLevel gradeLevel = GradeLevel.EnsinoMedio1,
        Shift shift = Shift.Morning,
        Guid? tenantId = null) : base(id)
    {
        SchoolId = schoolId;
        SetName(name);
        SetCode(code);
        SetSchoolYear(schoolYear);
        GradeLevel = gradeLevel;
        Shift = shift;
        TenantId = tenantId;
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Class name cannot be empty", nameof(name));

        if (name.Length > 100)
            throw new ArgumentException("Class name cannot exceed 100 characters", nameof(name));

        Name = name.Trim();
    }

    public void SetCode(string code)
    {
        if (string.IsNullOrWhiteSpace(code))
            throw new ArgumentException("Class code cannot be empty", nameof(code));

        if (code.Length > 50)
            throw new ArgumentException("Class code cannot exceed 50 characters", nameof(code));

        Code = code.Trim().ToUpperInvariant();
    }

    public void SetSchoolYear(int schoolYear)
    {
        if (schoolYear < 2000 || schoolYear > 2099)
            throw new ArgumentException("School year must be between 2000 and 2099", nameof(schoolYear));

        SchoolYear = schoolYear;
    }
}
