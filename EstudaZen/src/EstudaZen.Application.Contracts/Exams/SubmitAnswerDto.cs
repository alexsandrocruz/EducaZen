using System;
using System.ComponentModel.DataAnnotations;

namespace EstudaZen.Exams;

/// <summary>
/// DTO for submitting an answer to an exam question
/// </summary>
public class SubmitAnswerDto
{
    [Required]
    public Guid QuestionId { get; set; }

    /// <summary>
    /// Selected answer ID (null = skip/no answer)
    /// </summary>
    public Guid? SelectedAnswerId { get; set; }

    /// <summary>
    /// Time spent on this question in seconds
    /// </summary>
    public int TimeSpentSeconds { get; set; }
}
