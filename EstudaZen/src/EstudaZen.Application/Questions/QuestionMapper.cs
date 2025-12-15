using System.Collections.Generic;
using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace EstudaZen.Questions;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class QuestionMapper : MapperBase<Question, QuestionDto>
{
    public override partial QuestionDto Map(Question source);
    public override partial void Map(Question source, QuestionDto destination);

    [MapProperty(nameof(QuestionAnswer.Content), nameof(QuestionAnswerDto.Content))]
    private partial QuestionAnswerDto MapAnswer(QuestionAnswer source);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class CreateQuestionDtoMapper : MapperBase<CreateQuestionDto, Question>
{
    public override partial Question Map(CreateQuestionDto source);
    public override partial void Map(CreateQuestionDto source, Question destination);
    
    // Manually map answer to ensure new ID generation
    private QuestionAnswer MapAnswer(CreateQuestionAnswerDto source)
    {
        return new QuestionAnswer(
            System.Guid.NewGuid(), 
            System.Guid.Empty, // QuestionId will be set by navigation/EF
            source.Content, 
            source.IsCorrect
        );
    }
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class UpdateQuestionDtoMapper : MapperBase<UpdateQuestionDto, Question>
{
    public override partial Question Map(UpdateQuestionDto source);
    public override partial void Map(UpdateQuestionDto source, Question destination);
}
