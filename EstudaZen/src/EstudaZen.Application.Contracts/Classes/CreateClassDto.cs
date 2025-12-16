using System;
using System.ComponentModel.DataAnnotations;
using EstudaZen.Classes;

namespace EstudaZen.Classes;

/// <summary>
/// DTO for creating a new class
/// </summary>
public class CreateClassDto
{
    [Required]
    public Guid SchoolId { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(50)]
    public string Code { get; set; } = null!;

    public GradeLevel GradeLevel { get; set; } = GradeLevel.EnsinoMedio1;

    public Shift Shift { get; set; } = Shift.Morning;

    [Range(2000, 2099)]
    public int SchoolYear { get; set; } = DateTime.Now.Year;

    public int? MaxStudents { get; set; }

    public bool IsActive { get; set; } = true;
}
