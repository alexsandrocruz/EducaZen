using EstudaZen.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace EstudaZen.Permissions;

public class EstudaZenPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(EstudaZenPermissions.GroupName);

        var booksPermission = myGroup.AddPermission(EstudaZenPermissions.Books.Default, L("Permission:Books"));
        booksPermission.AddChild(EstudaZenPermissions.Books.Create, L("Permission:Books.Create"));
        booksPermission.AddChild(EstudaZenPermissions.Books.Edit, L("Permission:Books.Edit"));
        booksPermission.AddChild(EstudaZenPermissions.Books.Delete, L("Permission:Books.Delete"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(EstudaZenPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<EstudaZenResource>(name);
    }
}
