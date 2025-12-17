using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EstudaZen.Dashboards;

public interface IDashboardAppService : IApplicationService
{
    Task<HostDashboardDto> GetHostDashboardAsync();
    Task<TenantDashboardDto> GetTenantDashboardAsync();
    Task<SchoolDashboardDto> GetSchoolDashboardAsync();
}
