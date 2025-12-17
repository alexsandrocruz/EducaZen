using System;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Students;

public class ApproveStudentDto
{
    [Required]
    public Guid StudentId { get; set; }
    
    [Required]
    public bool Approved { get; set; } // true = aprovar, false = rejeitar
}
