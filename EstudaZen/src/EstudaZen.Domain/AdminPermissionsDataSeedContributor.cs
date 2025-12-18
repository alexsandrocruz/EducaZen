using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.PermissionManagement;

namespace EstudaZen;

/// <summary>
/// Seeds admin permissions for all modules.
/// When adding a new module, add its permissions here.
/// </summary>
public class AdminPermissionsDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IPermissionManager _permissionManager;

    public AdminPermissionsDataSeedContributor(IPermissionManager permissionManager)
    {
        _permissionManager = permissionManager;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Schools Permissions
        await GrantPermissionToAdminRoleAsync("EstudaZen.Schools");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Schools.Create");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Schools.Edit");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Schools.Delete");
        
        // Students Permissions
        await GrantPermissionToAdminRoleAsync("EstudaZen.Students");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Students.Create");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Students.Edit");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Students.Delete");
        
        // Classes Permissions
        await GrantPermissionToAdminRoleAsync("EstudaZen.Classes");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Classes.Create");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Classes.Edit");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Classes.Delete");
        
        // Questions Permissions
        await GrantPermissionToAdminRoleAsync("EstudaZen.Questions");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Questions.Create");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Questions.Edit");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Questions.Delete");
        
        // Tips Permissions
        await GrantPermissionToAdminRoleAsync("EstudaZen.Tips");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Tips.Create");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Tips.Edit");
        await GrantPermissionToAdminRoleAsync("EstudaZen.Tips.Delete");
    }

    private async Task GrantPermissionToAdminRoleAsync(string permissionName)
    {
        await _permissionManager.SetForRoleAsync("admin", permissionName, true);
    }
}
