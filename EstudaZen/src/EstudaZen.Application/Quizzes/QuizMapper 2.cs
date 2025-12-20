using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace EstudaZen.Quizzes;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class QuizMapper : MapperBase<Quiz, QuizDto>
{
    public override partial QuizDto Map(Quiz source);
    public override partial void Map(Quiz source, QuizDto destination);

    private partial QuizQuestionDto MapQuestion(QuizQuestion source);
}
