using System;
using System.ComponentModel.DataAnnotations;


namespace EstudaZen.Students;

public class CreateUpdateStudentDto
{
    [Required]
    [StringLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required] // Usually email is required for login mapping
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    public DateTime? BirthDate { get; set; }

    [StringLength(14)] // 000.000.000-00
    public string? CPF { get; set; }

    [StringLength(20)]
    public string? Gender { get; set; }

    [StringLength(20)]
    public string? Phone { get; set; }

    public Guid? ClassId { get; set; }

    public StudentStatus Status { get; set; } = StudentStatus.Active;
}
