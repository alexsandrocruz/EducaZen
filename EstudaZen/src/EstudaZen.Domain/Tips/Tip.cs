using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Tips;

/// <summary>
/// Represents a tip, news, or content item for the "For You" section
/// </summary>
public class Tip : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
    public Guid? TenantId { get; protected set; }

    /// <summary>
    /// Title of the tip
    /// </summary>
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;

    /// <summary>
    /// Description/content of the tip
    /// </summary>
    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = null!;

    /// <summary>
    /// Category of the tip
    /// </summary>
    public TipCategory Category { get; set; }

    /// <summary>
    /// Display type (Normal or Highlight)
    /// </summary>
    public TipType Type { get; set; }

    /// <summary>
    /// Icon name (MaterialCommunityIcons)
    /// </summary>
    [MaxLength(50)]
    public string Icon { get; set; } = "lightbulb-on";

    /// <summary>
    /// Icon color (hex format, e.g., #ffffff)
    /// </summary>
    [MaxLength(20)]
    public string? IconColor { get; set; }

    /// <summary>
    /// Icon background color
    /// </summary>
    [MaxLength(50)]
    public string? IconBgColor { get; set; }

    /// <summary>
    /// Optional image URL
    /// </summary>
    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    /// <summary>
    /// Optional external link
    /// </summary>
    [MaxLength(500)]
    public string? LinkUrl { get; set; }

    /// <summary>
    /// Whether the tip is active and visible
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Display order (lower = first)
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// Start date for displaying (null = always)
    /// </summary>
    public DateTime? StartDate { get; set; }

    /// <summary>
    /// End date for displaying (null = always)
    /// </summary>
    public DateTime? EndDate { get; set; }

    protected Tip() { }

    public Tip(Guid id, string title, string description, TipCategory category, Guid? tenantId = null) 
        : base(id)
    {
        Title = title;
        Description = description;
        Category = category;
        TenantId = tenantId;
    }

    /// <summary>
    /// Check if tip should be displayed based on date range
    /// </summary>
    public bool IsVisibleNow()
    {
        if (!IsActive) return false;
        
        var now = DateTime.UtcNow;
        if (StartDate.HasValue && now < StartDate.Value) return false;
        if (EndDate.HasValue && now > EndDate.Value) return false;
        
        return true;
    }
}
