using Microsoft.Extensions.Localization;
using EstudaZen.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace EstudaZen;

[Dependency(ReplaceServices = true)]
public class EstudaZenBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<EstudaZenResource> _localizer;

    public EstudaZenBrandingProvider(IStringLocalizer<EstudaZenResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
