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

    [StringLength(14)] // CPF: 000.000.000-00 (opcional)
    public string? Cpf { get; set; }

    // Código da escola (OPCIONAL) - se não informado, aluno vira cliente do Host
    [StringLength(20)]
    public string? SchoolCode { get; set; }
}
