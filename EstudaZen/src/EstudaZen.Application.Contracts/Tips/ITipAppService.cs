using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Tips;

/// <summary>
/// Application service for managing Tips/Blog content
/// </summary>
public interface ITipAppService : IApplicationService
{
    /// <summary>
    /// Get a tip by ID
    /// </summary>
    Task<TipDto> GetAsync(Guid id);

    /// <summary>
    /// Get list of tips with pagination and filtering
    /// </summary>
    Task<PagedResultDto<TipDto>> GetListAsync(GetTipListDto input);

    /// <summary>
    /// Create a new tip
    /// </summary>
    Task<TipDto> CreateAsync(CreateUpdateTipDto input);

    /// <summary>
    /// Update an existing tip
    /// </summary>
    Task<TipDto> UpdateAsync(Guid id, CreateUpdateTipDto input);

    /// <summary>
    /// Delete a tip
    /// </summary>
    Task DeleteAsync(Guid id);

    /// <summary>
    /// Get active tips for display (Home screen)
    /// </summary>
    Task<List<TipDto>> GetActiveTipsAsync(int maxCount = 10);
}
