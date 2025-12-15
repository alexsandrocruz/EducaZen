using EstudaZen.Localization;
using Volo.Abp.Application.Services;

namespace EstudaZen;

/* Inherit your application services from this class.
 */
public abstract class EstudaZenAppService : ApplicationService
{
    protected EstudaZenAppService()
    {
        LocalizationResource = typeof(EstudaZenResource);
    }
}
