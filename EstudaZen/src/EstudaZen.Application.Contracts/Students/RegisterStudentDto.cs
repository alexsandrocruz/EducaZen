using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Auditing;

namespace EstudaZen.Students;

public class RegisterStudentDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(128)]
    [DisableAuditing]
    public string Password { get; set; } = null!;

    [Required]
    public Guid SchoolId { get; set; }
}
