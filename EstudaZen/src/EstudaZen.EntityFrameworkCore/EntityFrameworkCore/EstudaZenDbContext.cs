using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using EstudaZen.Books;
using EstudaZen.Classes;
using EstudaZen.Exams;
using EstudaZen.Questions;
using EstudaZen.Quizzes;
using EstudaZen.Schools;
using EstudaZen.Simulados;
using EstudaZen.Students;
using EstudaZen.Subjects;
using EstudaZen.Subscriptions;
using EstudaZen.Tips;
using EstudaZen.Achievements;
using EstudaZen.Notifications;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace EstudaZen.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class EstudaZenDbContext :
    AbpDbContext<EstudaZenDbContext>,
    ITenantManagementDbContext,
    IIdentityDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    public DbSet<Book> Books { get; set; }

    #region VestiQuiz Entities

    public DbSet<Subject> Subjects { get; set; }
    public DbSet<School> Schools { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionAnswer> QuestionAnswers { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<QuizQuestion> QuizQuestions { get; set; }
    public DbSet<Simulado> Simulados { get; set; }
    public DbSet<SimuladoQuestion> SimuladoQuestions { get; set; }
    public DbSet<Plan> Plans { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    
    // NEW P0 Entities
    public DbSet<Class> Classes { get; set; }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<ExamQuestion> ExamQuestions { get; set; }
    public DbSet<ExamSession> ExamSessions { get; set; }
    public DbSet<ExamAnswer> ExamAnswers { get; set; }
    
    // Tips/Blog
    public DbSet<Tip> Tips { get; set; }
    
    // Achievements
    public DbSet<Achievement> Achievements { get; set; }
    public DbSet<StudentAchievement> StudentAchievements { get; set; }
    
    // Notifications
    public DbSet<Notification> Notifications { get; set; }

    #endregion

    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public EstudaZenDbContext(DbContextOptions<EstudaZenDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureTenantManagement();
        builder.ConfigureBlobStoring();
        
        builder.Entity<Book>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Books",
                EstudaZenConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
        });
        
        /* Configure VestiQuiz entities */

        // Subject
        builder.Entity<Subject>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Subjects", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(100);
            b.Property(x => x.IconName).HasMaxLength(50);
            b.Property(x => x.ColorHex).HasMaxLength(10);
            b.Property(x => x.EnemAreaCode).HasMaxLength(10);
            b.HasIndex(x => x.Name).IsUnique();
        });

        // School
        builder.Entity<School>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Schools", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
            b.Property(x => x.Code).HasMaxLength(50);
            b.Property(x => x.Address).HasMaxLength(500);
            b.HasIndex(x => new { x.TenantId, x.Name });
        });

        // Student
        builder.Entity<Student>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Students", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasOne(x => x.School).WithMany().HasForeignKey(x => x.SchoolId).OnDelete(DeleteBehavior.SetNull);
            b.HasIndex(x => x.UserId).IsUnique();
            b.HasIndex(x => new { x.TenantId, x.TotalXp }).IsDescending(false, true);
        });

        // Question
        builder.Entity<Question>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Questions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Content).IsRequired().HasMaxLength(2000);
            b.Property(x => x.Explanation).HasMaxLength(2000);
            b.Property(x => x.MediaUrl).HasMaxLength(500);
            b.Property(x => x.Tags).HasMaxLength(500);
            b.HasOne(x => x.Subject).WithMany().HasForeignKey(x => x.SubjectId).OnDelete(DeleteBehavior.Restrict);
            b.HasMany(x => x.Answers).WithOne().HasForeignKey(x => x.QuestionId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.TenantId, x.SubjectId, x.Difficulty });
        });

        // QuestionAnswer
        builder.Entity<QuestionAnswer>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "QuestionAnswers", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Content).IsRequired().HasMaxLength(1000);
        });

        // Quiz
        builder.Entity<Quiz>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Quizzes", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasMany(x => x.Questions).WithOne().HasForeignKey(x => x.QuizId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.StudentId, x.Status });
        });

        // QuizQuestion
        builder.Entity<QuizQuestion>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "QuizQuestions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
        });

        // Simulado
        builder.Entity<Simulado>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Simulados", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Title).IsRequired().HasMaxLength(200);
            b.Property(x => x.Description).HasMaxLength(1000);
            b.HasMany(x => x.Questions).WithOne().HasForeignKey(x => x.SimuladoId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.TenantId, x.IsPublished });
        });

        // SimuladoQuestion
        builder.Entity<SimuladoQuestion>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "SimuladoQuestions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
        });

        // Plan
        builder.Entity<Plan>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Plans", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(100);
            b.Property(x => x.Description).HasMaxLength(500);
        });

        // Subscription
        builder.Entity<Subscription>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Subscriptions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.ExternalSubscriptionId).HasMaxLength(200);
            b.HasOne(x => x.Plan).WithMany().HasForeignKey(x => x.PlanId).OnDelete(DeleteBehavior.Restrict);
            b.HasIndex(x => new { x.TenantId, x.Status });
        });

        // Class
        builder.Entity<Class>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Classes", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(100);
            b.Property(x => x.Code).IsRequired().HasMaxLength(50);
            b.HasIndex(x => new { x.SchoolId, x.Code }).IsUnique();
            b.HasIndex(x => new { x.SchoolYear, x.IsActive });
        });

        // Exam
        builder.Entity<Exam>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Exams", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Title).IsRequired().HasMaxLength(200);
            b.Property(x => x.Description).HasMaxLength(1000);
            b.HasMany(x => x.Questions).WithOne().HasForeignKey(x => x.ExamId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.TenantId, x.IsPublished });
            b.HasIndex(x => new { x.AvailableFrom, x.AvailableUntil });
        });

        // ExamQuestion
        builder.Entity<ExamQuestion>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "ExamQuestions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasIndex(x => new { x.ExamId, x.Order }).IsUnique();
        });

        // ExamSession
        builder.Entity<ExamSession>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "ExamSessions", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasMany(x => x.Answers).WithOne().HasForeignKey(x => x.ExamSessionId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.StudentId, x.ExamId, x.Status });
            b.HasIndex(x => x.StartedAt).IsDescending();
        });

        // ExamAnswer
        builder.Entity<ExamAnswer>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "ExamAnswers", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasIndex(x => new { x.ExamSessionId, x.QuestionId }).IsUnique();
        });

        // Tip
        builder.Entity<Tip>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Tips", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Title).IsRequired().HasMaxLength(200);
            b.Property(x => x.Description).IsRequired().HasMaxLength(500);
            b.Property(x => x.Icon).HasMaxLength(50);
            b.Property(x => x.IconColor).HasMaxLength(20);
            b.Property(x => x.IconBgColor).HasMaxLength(50);
            b.Property(x => x.ImageUrl).HasMaxLength(500);
            b.Property(x => x.LinkUrl).HasMaxLength(500);
            b.HasIndex(x => new { x.TenantId, x.IsActive, x.Order });
            b.HasIndex(x => new { x.StartDate, x.EndDate });
        });

        // Achievement
        builder.Entity<Achievement>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Achievements", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Code).IsRequired().HasMaxLength(50);
            b.Property(x => x.Title).IsRequired().HasMaxLength(100);
            b.Property(x => x.Description).HasMaxLength(500);
            b.Property(x => x.Icon).HasMaxLength(50);
            b.Property(x => x.GradientColors).HasMaxLength(100);
            b.Property(x => x.RequiredField).HasMaxLength(100);
            b.HasIndex(x => x.Code).IsUnique();
            b.HasIndex(x => new { x.TenantId, x.Trigger, x.IsActive });
        });

        // StudentAchievement
        builder.Entity<StudentAchievement>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "StudentAchievements", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasOne(x => x.Student).WithMany().HasForeignKey(x => x.StudentId).OnDelete(DeleteBehavior.Cascade);
            b.HasOne(x => x.Achievement).WithMany().HasForeignKey(x => x.AchievementId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.StudentId, x.AchievementId }).IsUnique();
        });

        // Notification
        builder.Entity<Notification>(b =>
        {
            b.ToTable(EstudaZenConsts.DbTablePrefix + "Notifications", EstudaZenConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Title).IsRequired().HasMaxLength(100);
            b.Property(x => x.Message).IsRequired().HasMaxLength(500);
            b.Property(x => x.Icon).HasMaxLength(50);
            b.Property(x => x.ActionUrl).HasMaxLength(200);
            b.Property(x => x.Data).HasMaxLength(500);
            b.HasOne(x => x.Student).WithMany().HasForeignKey(x => x.StudentId).OnDelete(DeleteBehavior.Cascade);
            b.HasIndex(x => new { x.StudentId, x.IsRead, x.CreationTime });
        });
    }
}
