namespace EstudaZen.Exams;

/// <summary>
/// Type of exam/assessment
/// </summary>
public enum ExamType
{
    /// <summary>
    /// Practice quiz - quick training
    /// </summary>
    Practice = 0,

    /// <summary>
    /// Mock exam - simulation
    /// </summary>
    Mock = 1,

    /// <summary>
    /// ENEM (Exame Nacional do Ensino Médio)
    /// </summary>
    ENEM = 2,

    /// <summary>
    /// Entrance exam (vestibular)
    /// </summary>
    Entrance = 3,

    /// <summary>
    /// Custom exam created by school
    /// </summary>
    Custom = 4
}
