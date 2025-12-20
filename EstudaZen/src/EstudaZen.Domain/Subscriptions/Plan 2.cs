using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace EstudaZen.Subscriptions;

/// <summary>
/// Subscription plan configuration
/// </summary>
public class Plan : FullAuditedAggregateRoot<Guid>
{
    /// <summary>
    /// Plan name (e.g., "Mensal", "Anual")
    /// </summary>
    public string Name { get; private set; } = null!;

    /// <summary>
    /// Plan description
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Price in BRL cents (e.g., 4990 = R$ 49,90)
    /// </summary>
    public int PriceCents { get; set; }

    /// <summary>
    /// Billing cycle
    /// </summary>
    public BillingCycle BillingCycle { get; set; }

    /// <summary>
    /// Trial period in days (0 = no trial)
    /// </summary>
    public int TrialDays { get; set; } = 7;

    /// <summary>
    /// Maximum students allowed (0 = unlimited)
    /// </summary>
    public int MaxStudents { get; set; }

    /// <summary>
    /// Maximum schools allowed (0 = unlimited)
    /// </summary>
    public int MaxSchools { get; set; }

    /// <summary>
    /// Whether AI features are enabled
    /// </summary>
    public bool HasAiFeatures { get; set; }

    /// <summary>
    /// Whether the plan is active
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Display order
    /// </summary>
    public int DisplayOrder { get; set; }

    protected Plan() { }

    public Plan(Guid id, string name, int priceCents, BillingCycle billingCycle) : base(id)
    {
        SetName(name);
        PriceCents = priceCents;
        BillingCycle = billingCycle;
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Plan name cannot be empty", nameof(name));

        Name = name.Trim();
    }

    /// <summary>
    /// Get price formatted in BRL
    /// </summary>
    public string GetFormattedPrice()
    {
        return $"R$ {PriceCents / 100.0:N2}";
    }
}
