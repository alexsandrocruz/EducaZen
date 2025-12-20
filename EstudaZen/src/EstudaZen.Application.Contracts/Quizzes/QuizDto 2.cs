using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Quizzes;

/// <summary>
/// DTO for Quiz entity
/// </summary>
public class QuizDto : EntityDto<Guid>
{
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
    public QuizStatus Status { get; set; }
    public int CurrentQuestionIndex { get; set; }
    public double Accuracy { get; set; }
    public TimeSpan ElapsedTime { get; set; }
    public List<QuizQuestionDto> Questions { get; set; } = new();
}

/// <summary>
/// DTO for QuizQuestion
/// </summary>
public class QuizQuestionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public int Order { get; set; }
    public Guid? SelectedAnswerId { get; set; }
    public bool? IsCorrect { get; set; }
    public int XpEarned { get; set; }
    public DateTime? AnsweredAt { get; set; }
}

/// <summary>
/// DTO for the current question in a quiz
/// </summary>
public class CurrentQuizQuestionDto
{
    public int QuestionNumber { get; set; }
    public int TotalQuestions { get; set; }
    public int CurrentStreak { get; set; }
    public string SubjectName { get; set; } = null!;
    public string SubjectColor { get; set; } = null!;
    public QuestionDifficulty Difficulty { get; set; }
    public string Content { get; set; } = null!;
    public string? MediaUrl { get; set; }
    public int Points { get; set; }
    public int TimeLimitSeconds { get; set; }
    public List<AnswerOptionDto> Answers { get; set; } = new();
}

/// <summary>
/// Answer option without revealing correct answer
/// </summary>
public class AnswerOptionDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = null!;
    public char Letter { get; set; }
}
