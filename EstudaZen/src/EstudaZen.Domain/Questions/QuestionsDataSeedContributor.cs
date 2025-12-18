using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EstudaZen.Subjects;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace EstudaZen.Questions;

public class QuestionsDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Subject, Guid> _subjectRepository;
    private readonly IRepository<Question, Guid> _questionRepository;
    private readonly IGuidGenerator _guidGenerator;

    public QuestionsDataSeedContributor(
        IRepository<Subject, Guid> subjectRepository,
        IRepository<Question, Guid> questionRepository,
        IGuidGenerator guidGenerator)
    {
        _subjectRepository = subjectRepository;
        _questionRepository = questionRepository;
        _guidGenerator = guidGenerator;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // 1. Ensure Subjects exist
        var subjects = await SeedSubjectsAsync();

        // 2. Clear existing questions if necessary? 
        // ABP practice usually checks existence. We will check if we already have many questions.
        if (await _questionRepository.GetCountAsync() >= 50)
        {
            return;
        }

        // 3. Seed Questions
        await SeedMathQuestionsAsync(subjects["MAT"]);
        await SeedHistoryQuestionsAsync(subjects["CH"]);
        await SeedPortQuestionsAsync(subjects["PORT"]);
        await SeedGeoQuestionsAsync(subjects["GEO"]);
        await SeedBioQuestionsAsync(subjects["BIO"]);
        await SeedFisQuestionsAsync(subjects["FIS"]);
        await SeedQuiQuestionsAsync(subjects["QUI"]);
        await SeedIngQuestionsAsync(subjects["ING"]);
        await SeedFilQuestionsAsync(subjects["FIL"]);
        await SeedSocQuestionsAsync(subjects["SOC"]);
    }

    private async Task<Dictionary<string, Guid>> SeedSubjectsAsync()
    {
        var dict = new Dictionary<string, Guid>();

        // We use the IDs provided by the user or common ones
        var subjectsData = new[]
        {
            (Id: Guid.Parse("3a1e3fbc-0e46-dd48-ac84-ac7e9d773260"), Name: "Matemática", Code: "MAT", Icon: "calculate", Color: "#FF7675", Area: "MAT"),
            (Id: Guid.Parse("3a1e30c4-4664-1d18-78a3-89de442186e0"), Name: "História", Code: "CH", Icon: "history", Color: "#F59E0B", Area: "CH"),
            (Id: Guid.Parse("44444444-4444-4444-4444-444444444444"), Name: "Português", Code: "PORT", Icon: "menu_book", Color: "#444444", Area: "LC"),
            (Id: Guid.Parse("55555555-5555-5555-5555-555555555555"), Name: "Geografia", Code: "GEO", Icon: "public", Color: "#10B981", Area: "CH"),
            (Id: Guid.Parse("66666666-6666-6666-6666-666666666666"), Name: "Biologia", Code: "BIO", Icon: "bioviz", Color: "#059669", Area: "CN"),
            (Id: Guid.Parse("77777777-7777-7777-7777-777777777777"), Name: "Física", Code: "FIS", Icon: "bolt", Color: "#3B82F6", Area: "CN"),
            (Id: Guid.Parse("88888888-8888-8888-8888-888888888888"), Name: "Química", Code: "QUI", Icon: "science", Color: "#8B5CF6", Area: "CN"),
            (Id: Guid.Parse("99999999-9999-9999-9999-999999999999"), Name: "Inglês", Code: "ING", Icon: "language", Color: "#EF4444", Area: "LC"),
            (Id: Guid.Parse("aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa"), Name: "Filosofia", Code: "FIL", Icon: "psychology", Color: "#6366F1", Area: "CH"),
            (Id: Guid.Parse("bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb"), Name: "Sociologia", Code: "SOC", Icon: "groups", Color: "#EC4899", Area: "CH")
        };

        foreach (var data in subjectsData)
        {
            var subject = await _subjectRepository.FindAsync(data.Id);
            if (subject == null)
            {
                subject = new Subject(data.Id, data.Name)
                {
                    IconName = data.Icon,
                    ColorHex = data.Color,
                    EnemAreaCode = data.Area,
                    IsActive = true
                };
                await _subjectRepository.InsertAsync(subject);
            }
            dict[data.Code] = subject.Id;
        }

        return dict;
    }

    private async Task SeedMathQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual a raiz quadrada de 144?", 0, new[] { "10", "12", "14", "11" }, 1),
            ("Quanto é 15% de 200?", 1, new[] { "20", "25", "30", "35" }, 2),
            ("Resolva: 2x - 4 = 10", 0, new[] { "5", "6", "7", "8" }, 2),
            ("Qual o valor de Pi (aproximado)?", 0, new[] { "3.12", "3.14", "3.16", "3.18" }, 1),
            ("Qual a área de um quadrado de lado 5?", 0, new[] { "20", "25", "30", "10" }, 1)
        };

        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedHistoryQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Quem descobriu o Brasil?", 0, new[] { "Cristóvão Colombo", "Pedro Álvares Cabral", "Vasco da Gama", "Dom Pedro I" }, 1),
            ("Em que ano iniciou a Segunda Guerra Mundial?", 1, new[] { "1914", "1939", "1945", "1929" }, 1),
            ("Quem foi o primeiro presidente do Brasil?", 1, new[] { "Getúlio Vargas", "Deodoro da Fonseca", "Prudente de Morais", "Juscelino Kubitschek" }, 1),
            ("Qual civilização construiu as pirâmides de Gizé?", 0, new[] { "Romanos", "Gregos", "Egípcios", "Maias" }, 2),
            ("O que foi a Revolução Francesa?", 1, new[] { "Movimento artístico", "Guerra religiosa", "Movimento político e social", "Descoberta científica" }, 2)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedPortQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual o antônimo de 'efêmero'?", 1, new[] { "Passageiro", "Duradouro", "Rápido", "Breve" }, 1),
            ("Qual destas palavras é oxítona?", 1, new[] { "Mesa", "Lâmpada", "Café", "Árvore" }, 2),
            ("Quem escreveu 'Dom Casmurro'?", 0, new[] { "Jorge Amado", "Machado de Assis", "Carlos Drummond", "Clarice Lispector" }, 1),
            ("O que é um substantivo?", 0, new[] { "Palavra que indica ação", "Palavra que nomeia seres", "Palavra que qualifica", "Palavra que liga orações" }, 1),
            ("Qual a classificação da palavra 'nós'?", 0, new[] { "Verbo", "Pronome", "Adjetivo", "Artigo" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedGeoQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual é o maior continente do mundo?", 0, new[] { "América", "Ásia", "África", "Europa" }, 1),
            ("Qual a capital da França?", 0, new[] { "Londres", "Paris", "Berlim", "Madri" }, 1),
            ("Qual o maior rio do mundo em volume de água?", 1, new[] { "Nilo", "Amazonas", "Yangtzé", "Mississippi" }, 1),
            ("Qual clima predomina no Nordeste brasileiro?", 1, new[] { "Equatorial", "Semiárido", "Subtropical", "Temperado" }, 1),
            ("Quantos estados tem o Brasil?", 0, new[] { "25", "26", "27", "28" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedBioQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual é a unidade básica da vida?", 0, new[] { "Átomo", "Célula", "Tecido", "Órgão" }, 1),
            ("Onde está localizado o DNA nas células eucariontes?", 1, new[] { "Citoplasma", "Núcleo", "Ribossomo", "Membrana" }, 1),
            ("Qual gás as plantas absorvem na fotossíntese?", 0, new[] { "Oxigênio", "Gás Carbônico", "Nitrogênio", "Hélio" }, 1),
            ("Cogumelos pertencem a qual reino?", 1, new[] { "Plantae", "Fungi", "Animalia", "Protista" }, 1),
            ("Qual célula transporta oxigênio no sangue?", 1, new[] { "Leucócito", "Hemácia", "Plaqueta", "Neurônio" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedFisQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual a fórmula da velocidade média?", 0, new[] { "F = m.a", "V = d/t", "E = mc²", "P = m.g" }, 1),
            ("Qual lei de Newton é conhecida como Lei da Inércia?", 1, new[] { "1ª Lei", "2ª Lei", "3ª Lei", "4ª Lei" }, 0),
            ("Qual o valor aproximado da gravidade na Terra?", 0, new[] { "5 m/s²", "9,8 m/s²", "12 m/s²", "20 m/s²" }, 1),
            ("Qual a unidade de energia no S.I.?", 1, new[] { "Newton", "Joule", "Watt", "Pascal" }, 1),
            ("A luz é uma onda:", 2, new[] { "Mecânica", "Eletromagnética", "Sonora", "Gravitacional" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedQuiQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Qual a fórmula da água?", 0, new[] { "CO2", "H2O", "H2O2", "NaCl" }, 1),
            ("Qual o símbolo do Ouro na tabela periódica?", 1, new[] { "Ag", "Au", "Fe", "Cu" }, 1),
            ("Um pH 7 é considerado:", 1, new[] { "Ácido", "Neutro", "Básico", "Alcalino" }, 1),
            ("Qual partícula tem carga negativa?", 0, new[] { "Próton", "Elétron", "Nêutron", "Fóton" }, 1),
            ("A passagem do estado sólido para o líquido chama-se:", 1, new[] { "Vaporização", "Fusão", "Solidificação", "Sublimação" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedIngQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Como se diz 'livro' em inglês?", 0, new[] { "Table", "Book", "Pen", "Car" }, 1),
            ("Qual o passado do verbo 'go'?", 1, new[] { "Goed", "Went", "Gone", "Going" }, 1),
            ("O que significa 'blue'?", 0, new[] { "Vermelho", "Azul", "Verde", "Amarelo" }, 1),
            ("Complete: She ___ a teacher.", 0, new[] { "are", "is", "am", "be" }, 1),
            ("Qual é o plural de 'child'?", 2, new[] { "Childs", "Children", "Childrens", "Childes" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedFilQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Quem disse 'Penso, logo existo'?", 1, new[] { "Platão", "Descartes", "Sócrates", "Aristóteles" }, 1),
            ("O que é ética?", 1, new[] { "Estudo dos astros", "Reflexão sobre a moral", "Estudo da vida", "Política partidária" }, 1),
            ("O Mito da Caverna é de autoria de:", 1, new[] { "Nietzsche", "Platão", "Marx", "Kant" }, 1),
            ("Sócrates é conhecido por qual método?", 2, new[] { "Científico", "Maiêutica", "Dialético", "Empírico" }, 1),
            ("Qual o tema principal de Maquiavel?", 1, new[] { "Religião", "Política", "Arte", "Biologia" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task SeedSocQuestionsAsync(Guid subjectId)
    {
        var questions = new List<(string Content, int Diff, string[] Alts, int Correct)>
        {
            ("Quem é considerado o pai da sociologia?", 1, new[] { "Freud", "Auguste Comte", "Darwin", "Einstein" }, 1),
            ("O que é cultura?", 1, new[] { "Apenas leitura de livros", "Conjunto de costumes e saberes", "Dinheiro", "Tecnologia" }, 1),
            ("Karl Marx focou seus estudos em:", 2, new[] { "Astronomia", "Luta de classes", "Psicanálise", "Genética" }, 1),
            ("O que significa desigualdade social?", 0, new[] { "Todos ganharem igual", "Diferença de acesso a recursos", "Serem todos altos", "Gostarem de coisas diferentes" }, 1),
            ("O que é globalização?", 1, new[] { "Isolamento dos países", "Integração mundial", "Criação de novos planetas", "Fim do mundo" }, 1)
        };
        foreach (var q in questions) await CreateQuestionAsync(subjectId, q);
    }

    private async Task CreateQuestionAsync(Guid subjectId, (string Content, int Diff, string[] Alts, int Correct) q)
    {
        var question = new Question(
            _guidGenerator.Create(),
            subjectId,
            q.Content,
            (QuestionDifficulty)q.Diff
        );

        for (int i = 0; i < q.Alts.Length; i++)
        {
            question.AddAnswer(_guidGenerator.Create(), q.Alts[i], i == q.Correct);
        }

        await _questionRepository.InsertAsync(question);
    }
}
