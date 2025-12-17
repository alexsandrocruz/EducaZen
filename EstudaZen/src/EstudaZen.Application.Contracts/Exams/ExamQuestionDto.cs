using System;
using EstudaZen.Questions;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Exams;

public class ExamQuestionDto : EntityDto<Guid>
{
    public Guid ExamId { get; set; }
    public Guid QuestionId { get; set; }
    public string Content { get; set; } = null!;
    public QuestionDifficulty Difficulty { get; set; }
    public Guid SubjectId { get; set; }
    public decimal Points { get; set; }
    public int Order { get; set; }
}
