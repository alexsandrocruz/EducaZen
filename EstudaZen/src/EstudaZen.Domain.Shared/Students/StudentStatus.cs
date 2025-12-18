namespace EstudaZen.Students;

/// <summary>
/// Student status enum
/// </summary>
public enum StudentStatus
{
    /// <summary>
    /// Aguardando aprovação da escola
    /// </summary>
    PENDING = 0,

    /// <summary>
    /// Aprovado - pode usar o app
    /// </summary>
    APPROVED = 1,

    /// <summary>
    /// Rejeitado pela escola
    /// </summary>
    REJECTED = 2,

    /// <summary>
    /// Active student (legado - equivalente a APPROVED)
    /// </summary>
    Active = 10,

    /// <summary>
    /// Inactive student
    /// </summary>
    Inactive = 11,

    /// <summary>
    /// Transferred to another school
    /// </summary>
    Transferred = 12,

    /// <summary>
    /// Graduated/completed
    /// </summary>
    Graduated = 13,

    /// <summary>
    /// Suspended
    /// </summary>
    Suspended = 14
}
