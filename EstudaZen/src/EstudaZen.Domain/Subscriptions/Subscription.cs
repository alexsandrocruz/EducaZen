using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace EstudaZen.Subscriptions;

/// <summary>
/// Tenant subscription to a plan
/// </summary>
public class Subscription : FullAuditedAggregateRoot<Guid>
{
    /// <summary>
    /// Tenant (prefeitura) this subscription belongs to
    /// </summary>
    public Guid TenantId { get; private set; }

    /// <summary>
    /// Subscription plan
    /// </summary>
    public Guid PlanId { get; private set; }
    public Plan? Plan { get; set; }

    /// <summary>
    /// Current status
    /// </summary>
    public SubscriptionStatus Status { get; private set; } = SubscriptionStatus.Trial;

    /// <summary>
    /// When the subscription started
    /// </summary>
    public DateTime StartDate { get; private set; }

    /// <summary>
    /// When the current period ends
    /// </summary>
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// When trial expires (if applicable)
    /// </summary>
    public DateTime? TrialEndsAt { get; private set; }

    /// <summary>
    /// External payment provider subscription ID
    /// </summary>
    public string? ExternalSubscriptionId { get; set; }

    /// <summary>
    /// Last payment date
    /// </summary>
    public DateTime? LastPaymentAt { get; set; }

    /// <summary>
    /// Next billing date
    /// </summary>
    public DateTime? NextBillingAt { get; set; }

    protected Subscription() { }

    public Subscription(Guid id, Guid tenantId, Guid planId, int trialDays = 7) : base(id)
    {
        TenantId = tenantId;
        PlanId = planId;
        StartDate = DateTime.UtcNow;

        if (trialDays > 0)
        {
            Status = SubscriptionStatus.Trial;
            TrialEndsAt = DateTime.UtcNow.AddDays(trialDays);
            EndDate = TrialEndsAt;
        }
        else
        {
            Status = SubscriptionStatus.Active;
        }
    }

    /// <summary>
    /// Activate subscription after trial or payment
    /// </summary>
    public void Activate(DateTime? endDate = null)
    {
        Status = SubscriptionStatus.Active;
        if (endDate.HasValue)
            EndDate = endDate;
    }

    /// <summary>
    /// Mark subscription as expired
    /// </summary>
    public void Expire()
    {
        Status = SubscriptionStatus.Expired;
    }

    /// <summary>
    /// Cancel the subscription
    /// </summary>
    public void Cancel()
    {
        Status = SubscriptionStatus.Cancelled;
    }

    /// <summary>
    /// Renew subscription for another period
    /// </summary>
    public void Renew(DateTime newEndDate)
    {
        Status = SubscriptionStatus.Active;
        EndDate = newEndDate;
        LastPaymentAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Check if subscription is currently active or in trial
    /// </summary>
    public bool IsActiveOrTrial()
    {
        if (Status == SubscriptionStatus.Cancelled || Status == SubscriptionStatus.Expired)
            return false;

        if (Status == SubscriptionStatus.Trial && TrialEndsAt < DateTime.UtcNow)
            return false;

        if (Status == SubscriptionStatus.Active && EndDate < DateTime.UtcNow)
            return false;

        return true;
    }

    /// <summary>
    /// Get days remaining in current period
    /// </summary>
    public int GetDaysRemaining()
    {
        var endDate = EndDate ?? TrialEndsAt;
        if (!endDate.HasValue)
            return 0;

        var remaining = (endDate.Value - DateTime.UtcNow).Days;
        return remaining > 0 ? remaining : 0;
    }
}
