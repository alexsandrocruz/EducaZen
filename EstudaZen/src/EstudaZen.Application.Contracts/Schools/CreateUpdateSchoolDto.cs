using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Schools;

public class CreateUpdateSchoolDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    public string? Code { get; set; }

    [StringLength(20)]
    public string? CNPJ { get; set; }

    public string? Address { get; set; }
    
    [StringLength(100)]
    public string? City { get; set; }
    
    [StringLength(2)]
    public string? State { get; set; }
    
    [StringLength(10)]
    public string? ZipCode { get; set; }

    [Phone]
    [StringLength(20)]
    public string? Phone { get; set; }
    
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }

    public bool IsActive { get; set; } = true;
}
