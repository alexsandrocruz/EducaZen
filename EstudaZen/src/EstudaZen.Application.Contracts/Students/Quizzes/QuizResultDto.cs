using System;
using System.Collections.Generic;

namespace EstudaZen.Students.Quizzes;

public class QuizResultDto
{
    public Guid QuizId { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public int TotalXpEarned { get; set; }
    public int HighestStreak { get; set; }
    public double AccuracyPercentage { get; set; }
    public TimeSpan ElapsedTime { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime CompletedAt { get; set; }
    
    /// <summary>
    /// All questions with correct/incorrect indicators
    /// </summary>
    public List<QuizQuestionDto> Questions { get; set; } = new();
}
