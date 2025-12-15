using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace EstudaZen.Subjects;

/// <summary>
/// Represents a subject/discipline (e.g., Mathematics, History, Biology)
/// </summary>
public class Subject : FullAuditedAggregateRoot<Guid>
{
    /// <summary>
    /// Display name of the subject
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Material icon name for UI display
    /// </summary>
    public string IconName { get; set; } = "school";

    /// <summary>
    /// Hex color code for UI theming
    /// </summary>
    public string ColorHex { get; set; } = "#7C3AED";

    /// <summary>
    /// ENEM area code (e.g., "CN" for Ciências da Natureza)
    /// </summary>
    public string? EnemAreaCode { get; set; }

    /// <summary>
    /// Display order in lists
    /// </summary>
    public int DisplayOrder { get; set; }

    /// <summary>
    /// Whether the subject is active and visible
    /// </summary>
    public bool IsActive { get; set; } = true;

    public Subject() { }

    public Subject(Guid id, string name) : base(id)
    {
        SetName(name);
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Subject name cannot be empty", nameof(name));

        Name = name.Trim();
    }
}
