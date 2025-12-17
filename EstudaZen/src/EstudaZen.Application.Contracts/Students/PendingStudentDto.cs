using System;

namespace EstudaZen.Students;

public class PendingStudentDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Cpf { get; set; }
    public DateTime CreationTime { get; set; }
}
