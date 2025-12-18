using System;
using System.ComponentModel.DataAnnotations;
using EstudaZen.Questions;

namespace EstudaZen.Students.Quizzes;

public class StartQuizDto
{
    /// <summary>
    /// Optional subject filter (null = mixed subjects)
    /// </summary>
    public Guid? SubjectId { get; set; }
    
    /// <summary>
    /// Optional difficulty filter (null = mixed difficulties)
    /// </summary>
    public QuestionDifficulty? Difficulty { get; set; }
    
    /// <summary>
    /// Number of questions in the quiz (default: 10)
    /// </summary>
    [Range(1, 50)]
    public int TotalQuestions { get; set; } = 10;
}
