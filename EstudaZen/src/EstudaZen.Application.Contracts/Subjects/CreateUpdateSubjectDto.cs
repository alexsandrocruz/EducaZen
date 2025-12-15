using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Subjects;

/// <summary>
/// DTO for creating/updating Subject
/// </summary>
public class CreateUpdateSubjectDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    public string IconName { get; set; } = "school";

    [StringLength(10)]
    public string ColorHex { get; set; } = "#7C3AED";

    [StringLength(10)]
    public string? EnemAreaCode { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;
}
