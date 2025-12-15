using Riok.Mapperly.Abstractions;
using EstudaZen.Exams;

namespace EstudaZen.Exams;

[Mapper]
public partial class ExamSessionMapper
{
    public partial ExamSessionDto Map(ExamSession source);
    public partial ExamSessionDetailDto MapToDetail(ExamSession source);
    public partial ExamAnswerDto Map(ExamAnswer source);
}
