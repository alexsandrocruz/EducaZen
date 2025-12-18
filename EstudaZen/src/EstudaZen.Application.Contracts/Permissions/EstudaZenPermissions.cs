namespace EstudaZen.Permissions;

public static class EstudaZenPermissions
{
    public const string GroupName = "EstudaZen";


    public static class Books
    {
        public const string Default = GroupName + ".Books";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }

    public static class Classes
    {
        public const string Default = GroupName + ".Classes";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }

    public static class Students
    {
        public const string Default = GroupName + ".Students";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }

    public static class Schools
    {
        public const string Default = GroupName + ".Schools";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }

    public static class Tips
    {
        public const string Default = GroupName + ".Tips";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
    
    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
}
