using System;
using System.Collections.Generic;

namespace EstudaZen.Students;

/// <summary>
/// DTO unificado para a tela Home do aluno no app mobile
/// </summary>
public class StudentHomeDashboardDto
{
    #region User Info
    
    /// <summary>
    /// Nome completo do aluno
    /// </summary>
    public string FullName { get; set; } = "Estudante";
    
    /// <summary>
    /// URL da foto de perfil
    /// </summary>
    public string? PhotoUrl { get; set; }
    
    /// <summary>
    /// Status do aluno (PENDING, APPROVED, REJECTED)
    /// </summary>
    public StudentStatus Status { get; set; }
    
    /// <summary>
    /// Nível atual do aluno
    /// </summary>
    public int CurrentLevel { get; set; }
    
    #endregion

    #region League Info
    
    /// <summary>
    /// Nome da liga atual (ex: "Bronze III", "Prata I")
    /// </summary>
    public string LeagueName { get; set; } = "Bronze III";
    
    /// <summary>
    /// XP atual do aluno
    /// </summary>
    public int CurrentXp { get; set; }
    
    /// <summary>
    /// XP necessário para a próxima liga
    /// </summary>
    public int XpToNextLeague { get; set; }
    
    /// <summary>
    /// Dias de sequência atual
    /// </summary>
    public int StreakDays { get; set; }
    
    /// <summary>
    /// Percentil do ranking (Top X%)
    /// </summary>
    public int RankPercentile { get; set; }
    
    #endregion

    #region Today's Stats
    
    /// <summary>
    /// Questões respondidas hoje
    /// </summary>
    public int QuestionsToday { get; set; }
    
    /// <summary>
    /// Meta diária de questões
    /// </summary>
    public int DailyGoal { get; set; } = 50;
    
    /// <summary>
    /// Taxa de acerto geral (%)
    /// </summary>
    public decimal AccuracyRate { get; set; }
    
    /// <summary>
    /// Total de questões respondidas
    /// </summary>
    public int TotalQuestionsAnswered { get; set; }
    
    /// <summary>
    /// Total de respostas corretas
    /// </summary>
    public int TotalCorrectAnswers { get; set; }
    
    #endregion

    #region Tips/Content
    
    /// <summary>
    /// Lista de dicas/conteúdos para o aluno
    /// </summary>
    public List<HomeTipDto> Tips { get; set; } = new();
    
    #endregion
}

/// <summary>
/// DTO para dicas/conteúdos na Home (diferente do Tips.TipDto usado no CRUD)
/// </summary>
public class HomeTipDto
{
    /// <summary>
    /// ID único da dica
    /// </summary>
    public string Id { get; set; } = null!;
    
    /// <summary>
    /// Tipo: "highlight" (destaque com gradiente) ou "normal"
    /// </summary>
    public string Type { get; set; } = "normal";
    
    /// <summary>
    /// Categoria: "Dica do Dia", "Novidade", "Estudos"
    /// </summary>
    public string Category { get; set; } = null!;
    
    /// <summary>
    /// Título da dica
    /// </summary>
    public string Title { get; set; } = null!;
    
    /// <summary>
    /// Descrição/conteúdo da dica
    /// </summary>
    public string Description { get; set; } = null!;
    
    /// <summary>
    /// Nome do ícone (MaterialCommunityIcons)
    /// </summary>
    public string Icon { get; set; } = "lightbulb-on";
    
    /// <summary>
    /// Cor do ícone (hex ou nome)
    /// </summary>
    public string? IconColor { get; set; }
    
    /// <summary>
    /// Cor de fundo do ícone
    /// </summary>
    public string? IconBgColor { get; set; }
}

/// <summary>
/// Estatísticas do dia para um aluno
/// </summary>
public class TodayStatsDto
{
    public int QuestionsAnswered { get; set; }
    public int CorrectAnswers { get; set; }
}
