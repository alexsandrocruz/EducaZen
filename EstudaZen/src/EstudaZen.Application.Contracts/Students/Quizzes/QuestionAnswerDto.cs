using System;

namespace EstudaZen.Students.Quizzes;

public class QuestionAnswerDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = null!;
    public int Order { get; set; }
    
    // Only shown after answering
    public bool? IsCorrect { get; set; }
}
