using System;
using EstudaZen.Questions;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for auto-generating exam questions
/// </summary>
public class GenerateExamQuestionsDto
{
    /// <summary>
    /// Total number of questions to generate
    /// </summary>
    public int TotalQuestions { get; set; } = 30;

    /// <summary>
    /// Filter by subject (null = all subjects)
    /// </summary>
    public Guid? SubjectId { get; set; }

    /// <summary>
    /// Filter by year (null = any year)
    /// </summary>
    public int? Year { get; set; }

    /// <summary>
    /// Use single difficulty (if set, ignores distribution)
    /// </summary>
    public QuestionDifficulty? SingleDifficulty { get; set; }

    /// <summary>
    /// Percentage of easy questions (0-100)
    /// </summary>
    public int EasyPercent { get; set; } = 30;

    /// <summary>
    /// Percentage of medium questions (0-100)
    /// </summary>
    public int MediumPercent { get; set; } = 40;

    /// <summary>
    /// Percentage of hard questions (0-100)
    /// </summary>
    public int HardPercent { get; set; } = 30;

    /// <summary>
    /// Avoid recently used questions
    /// </summary>
    public bool AvoidRecentlyUsed { get; set; } = true;

    /// <summary>
    /// Days to consider for recently used
    /// </summary>
    public int AvoidUsedInDays { get; set; } = 30;

    /// <summary>
    /// Points per question
    /// </summary>
    public decimal PointsPerQuestion { get; set; } = 10;
}
