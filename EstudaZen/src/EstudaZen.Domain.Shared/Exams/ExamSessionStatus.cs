namespace EstudaZen.Exams;

/// <summary>
/// Status of an exam session
/// </summary>
public enum ExamSessionStatus
{
    /// <summary>
    /// Session is currently in progress
    /// </summary>
    InProgress = 0,
    
    /// <summary>
    /// Session was completed successfully
    /// </summary>
    Completed = 1,
    
    /// <summary>
    /// Session was abandoned by the student
    /// </summary>
    Abandoned = 2,
    
    /// <summary>
    /// Session timed out (duration exceeded)
    /// </summary>
    TimedOut = 3
}
