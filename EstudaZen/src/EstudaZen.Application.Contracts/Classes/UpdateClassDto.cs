using System;
using System.ComponentModel.DataAnnotations;
using EstudaZen.Classes;

namespace EstudaZen.Classes;

/// <summary>
/// DTO for updating an existing class
/// </summary>
public class UpdateClassDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(50)]
    public string Code { get; set; } = null!;

    public GradeLevel GradeLevel { get; set; }

    public Shift Shift { get; set; }

    [Range(2000, 2099)]
    public int SchoolYear { get; set; }

    public int? MaxStudents { get; set; }

    public bool IsActive { get; set; }
}
