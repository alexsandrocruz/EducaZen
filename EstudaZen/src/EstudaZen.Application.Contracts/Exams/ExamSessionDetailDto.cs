using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Exams;

/// <summary>
/// Detailed DTO for ExamSession with answers
/// </summary>
public class ExamSessionDetailDto : ExamSessionDto
{
    public List<ExamAnswerDto> Answers { get; set; } = new();
}
