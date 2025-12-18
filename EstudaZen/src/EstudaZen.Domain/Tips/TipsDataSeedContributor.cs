using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace EstudaZen.Tips;

public class TipsDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Tip, Guid> _tipRepository;
    private readonly IGuidGenerator _guidGenerator;

    public TipsDataSeedContributor(
        IRepository<Tip, Guid> tipRepository,
        IGuidGenerator guidGenerator)
    {
        _tipRepository = tipRepository;
        _guidGenerator = guidGenerator;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (await _tipRepository.GetCountAsync() >= 5)
        {
            return;
        }

        // Dica do Dia - Highlight
        await _tipRepository.InsertAsync(new Tip(
            _guidGenerator.Create(),
            "Fórmula de Bhaskara",
            "Revise equações de 2º grau para garantir pontos em Matemática básica. A fórmula é essencial para o ENEM!",
            TipCategory.DicaDoDia
        )
        {
            Type = TipType.Highlight,
            Icon = "lightbulb-on",
            IconColor = "#ffffff",
            Order = 1,
            IsActive = true
        });

        // Novidade - Edital FUVEST
        await _tipRepository.InsertAsync(new Tip(
            _guidGenerator.Create(),
            "Edital FUVEST 2024",
            "Confira as principais mudanças no formato da prova e datas de inscrição. Não perca o prazo!",
            TipCategory.Novidade
        )
        {
            Type = TipType.Normal,
            Icon = "newspaper-variant-outline",
            IconColor = "#3b82f6",
            IconBgColor = "rgba(59, 130, 246, 0.1)",
            Order = 2,
            IsActive = true
        });

        // Estudos - Aulão de Revisão
        await _tipRepository.InsertAsync(new Tip(
            _guidGenerator.Create(),
            "Aulão de Revisão",
            "Participe da live de História Geral hoje às 19h no app. Tema: Revolução Francesa e suas consequências.",
            TipCategory.Estudos
        )
        {
            Type = TipType.Normal,
            Icon = "school",
            IconColor = "#7f13ec",
            IconBgColor = "rgba(127, 19, 236, 0.1)",
            Order = 3,
            IsActive = true
        });

        // Evento - Simuladão ENEM
        await _tipRepository.InsertAsync(new Tip(
            _guidGenerator.Create(),
            "Simuladão ENEM",
            "Dia 15 teremos nosso super simulado com 180 questões no estilo ENEM. Inscreva-se já!",
            TipCategory.Evento
        )
        {
            Type = TipType.Normal,
            Icon = "calendar-star",
            IconColor = "#10b981",
            IconBgColor = "rgba(16, 185, 129, 0.1)",
            Order = 4,
            IsActive = true
        });

        // Dica de Estudos - Redação
        await _tipRepository.InsertAsync(new Tip(
            _guidGenerator.Create(),
            "Como tirar 1000 na Redação",
            "Aprenda as 5 competências avaliadas e técnicas para desenvolver sua argumentação de forma impecável.",
            TipCategory.Estudos
        )
        {
            Type = TipType.Normal,
            Icon = "pen",
            IconColor = "#ec4899",
            IconBgColor = "rgba(236, 72, 153, 0.1)",
            Order = 5,
            IsActive = true
        });
    }
}
