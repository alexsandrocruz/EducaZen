using System;
using Volo.Abp.Application.Dtos;

namespace EstudaZen.Tips;

/// <summary>
/// DTO for Tip entity
/// </summary>
public class TipDto : EntityDto<Guid>
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public TipCategory Category { get; set; }
    public TipType Type { get; set; }
    public string Icon { get; set; } = "lightbulb-on";
    public string? IconColor { get; set; }
    public string? IconBgColor { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public bool IsActive { get; set; }
    public int Order { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

/// <summary>
/// DTO for creating/updating a Tip
/// </summary>
public class CreateUpdateTipDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public TipCategory Category { get; set; }
    public TipType Type { get; set; }
    public string Icon { get; set; } = "lightbulb-on";
    public string? IconColor { get; set; }
    public string? IconBgColor { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public int Order { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

/// <summary>
/// DTO for listing/filtering tips
/// </summary>
public class GetTipListDto : PagedAndSortedResultRequestDto
{
    public TipCategory? Category { get; set; }
    public bool? IsActive { get; set; }
    public string? Filter { get; set; }
}
