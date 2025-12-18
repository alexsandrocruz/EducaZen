using System;
using System.Collections.Generic;
using EstudaZen.Questions;

namespace EstudaZen.Students.Quizzes;

public class QuizQuestionDto
{
    public Guid QuestionId { get; set; }
    public string Content { get; set; } = null!;
    public string? MediaUrl { get; set; }
    public string? Explanation { get; set; }
    public QuestionDifficulty Difficulty { get; set; }
    public int Points { get; set; }
    public int Order { get; set; }
    public List<QuestionAnswerDto> Answers { get; set; } = new();
    
    // Filled after answering
    public Guid? SelectedAnswerId { get; set; }
    public bool? IsCorrect { get; set; }
    public int? XpEarned { get; set; }
}
