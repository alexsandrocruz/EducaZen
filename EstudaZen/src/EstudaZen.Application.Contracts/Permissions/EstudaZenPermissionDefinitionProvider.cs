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

        var classesPermission = myGroup.AddPermission(EstudaZenPermissions.Classes.Default, L("Permission:Classes"));
        classesPermission.AddChild(EstudaZenPermissions.Classes.Create, L("Permission:Classes.Create"));
        classesPermission.AddChild(EstudaZenPermissions.Classes.Edit, L("Permission:Classes.Edit"));
        classesPermission.AddChild(EstudaZenPermissions.Classes.Delete, L("Permission:Classes.Delete"));

        var students = myGroup.AddPermission(EstudaZenPermissions.Students.Default, L("Permission:Students"));
        students.AddChild(EstudaZenPermissions.Students.Create, L("Permission:Create"));
        students.AddChild(EstudaZenPermissions.Students.Edit, L("Permission:Edit"));
        students.AddChild(EstudaZenPermissions.Students.Delete, L("Permission:Delete"));

        var schools = myGroup.AddPermission(EstudaZenPermissions.Schools.Default, L("Permission:Schools"));
        schools.AddChild(EstudaZenPermissions.Schools.Create, L("Permission:Create"));
        schools.AddChild(EstudaZenPermissions.Schools.Edit, L("Permission:Edit"));
        schools.AddChild(EstudaZenPermissions.Schools.Delete, L("Permission:Delete"));

        var tips = myGroup.AddPermission(EstudaZenPermissions.Tips.Default, L("Permission:Tips"));
        tips.AddChild(EstudaZenPermissions.Tips.Create, L("Permission:Create"));
        tips.AddChild(EstudaZenPermissions.Tips.Edit, L("Permission:Edit"));
        tips.AddChild(EstudaZenPermissions.Tips.Delete, L("Permission:Delete"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(EstudaZenPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<EstudaZenResource>(name);
    }
}
