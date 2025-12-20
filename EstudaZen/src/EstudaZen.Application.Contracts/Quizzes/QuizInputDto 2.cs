using System;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Quizzes;

/// <summary>
/// DTO for starting a new quiz
/// </summary>
public class StartQuizDto
{
    /// <summary>
    /// Number of questions (5, 10, 15, 20)
    /// </summary>
    [Range(5, 50)]
    public int QuestionCount { get; set; } = 10;

    /// <summary>
    /// Optional subject filter
    /// </summary>
    public Guid? SubjectId { get; set; }

    /// <summary>
    /// Optional difficulty filter
    /// </summary>
    public QuestionDifficulty? Difficulty { get; set; }
}

/// <summary>
/// DTO for answering a question
/// </summary>
public class AnswerQuestionDto
{
    [Required]
    public Guid QuizId { get; set; }

    [Required]
    public Guid SelectedAnswerId { get; set; }
}

/// <summary>
/// Result after answering a question
/// </summary>
public class AnswerResultDto
{
    public bool IsCorrect { get; set; }
    public int XpEarned { get; set; }
    public int CurrentStreak { get; set; }
    public Guid CorrectAnswerId { get; set; }
    public string? Explanation { get; set; }
    public bool QuizCompleted { get; set; }
    public int CorrectAnswersCount { get; set; }
    public int TotalQuestionsAnswered { get; set; }
}
