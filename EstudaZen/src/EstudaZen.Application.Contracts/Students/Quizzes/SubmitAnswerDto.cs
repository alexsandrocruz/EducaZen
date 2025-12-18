using System;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Students.Quizzes;

public class SubmitAnswerDto
{
    [Required]
    public Guid QuizId { get; set; }
    
    [Required]
    public Guid QuestionId { get; set; }
    
    [Required]
    public Guid SelectedAnswerId { get; set; }
}
