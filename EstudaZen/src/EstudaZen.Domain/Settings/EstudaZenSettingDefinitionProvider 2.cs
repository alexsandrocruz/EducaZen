using Volo.Abp.Settings;

namespace EstudaZen.Settings;

public class EstudaZenSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(EstudaZenSettings.MySetting1));
    }
}
