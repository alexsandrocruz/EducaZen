using EstudaZen.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace EstudaZen.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class EstudaZenController : AbpControllerBase
{
    protected EstudaZenController()
    {
        LocalizationResource = typeof(EstudaZenResource);
    }
}
