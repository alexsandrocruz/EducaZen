using System;
using EstudaZen.Questions;

namespace EstudaZen.Students.Quizzes;

public class QuizDto
{
    public Guid Id { get; set; }
    public Guid StudentId { get; set; }
    public Guid? SubjectId { get; set; }
    public string? SubjectName { get; set; }
    public QuestionDifficulty? Difficulty { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public int TotalXpEarned { get; set; }
    public int CurrentStreak { get; set; }
    public int HighestStreak { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string Status { get; set; } = null!;
    public int CurrentQuestionIndex { get; set; }
    public double AccuracyPercentage { get; set; }
    public TimeSpan? ElapsedTime { get; set; }
}
