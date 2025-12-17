using Riok.Mapperly.Abstractions;

namespace EstudaZen.Exams;

[Mapper]
public partial class ExamMapper
{
    public partial ExamDto Map(Exam source);
}
