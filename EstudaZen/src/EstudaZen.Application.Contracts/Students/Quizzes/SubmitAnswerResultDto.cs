using System;

namespace EstudaZen.Students.Quizzes;

public class SubmitAnswerResultDto
{
    public bool IsCorrect { get; set; }
    public int XpEarned { get; set; }
    public int CurrentStreak { get; set; }
    public Guid? CorrectAnswerId { get; set; }
    public string? Explanation { get; set; }
    
    /// <summary>
    /// Next question or null if quiz is complete
    /// </summary>
    public QuizQuestionDto? NextQuestion { get; set; }
    
    /// <summary>
    /// True if the quiz is now complete
    /// </summary>
    public bool IsQuizComplete { get; set; }
}
