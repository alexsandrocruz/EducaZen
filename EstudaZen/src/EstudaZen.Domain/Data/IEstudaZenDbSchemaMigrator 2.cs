using System.Threading.Tasks;

namespace EstudaZen.Data;

public interface IEstudaZenDbSchemaMigrator
{
    Task MigrateAsync();
}
