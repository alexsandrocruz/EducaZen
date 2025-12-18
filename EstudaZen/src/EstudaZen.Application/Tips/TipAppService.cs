using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstudaZen.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace EstudaZen.Tips;

[Authorize(EstudaZenPermissions.Tips.Default)]
public class TipAppService : ApplicationService, ITipAppService
{
    private readonly ITipRepository _tipRepository;
    private readonly TipMapper _tipMapper;

    public TipAppService(
        ITipRepository tipRepository,
        TipMapper tipMapper)
    {
        _tipRepository = tipRepository;
        _tipMapper = tipMapper;
    }

    public async Task<TipDto> GetAsync(Guid id)
    {
        var tip = await _tipRepository.GetAsync(id);
        return _tipMapper.Map(tip);
    }

    public async Task<PagedResultDto<TipDto>> GetListAsync(GetTipListDto input)
    {
        var query = await _tipRepository.GetQueryableAsync();

        // Apply filters
        if (input.Category.HasValue)
        {
            query = query.Where(x => x.Category == input.Category.Value);
        }

        if (input.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == input.IsActive.Value);
        }

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            var filter = input.Filter.ToLower();
            query = query.Where(x => 
                x.Title.ToLower().Contains(filter) || 
                x.Description.ToLower().Contains(filter));
        }

        var totalCount = query.Count();

        // Apply sorting
        query = string.IsNullOrWhiteSpace(input.Sorting)
            ? query.OrderBy(x => x.Order).ThenByDescending(x => x.CreationTime)
            : query.OrderBy(x => x.Order); // TODO: implement dynamic sorting

        // Apply paging
        query = query.Skip(input.SkipCount).Take(input.MaxResultCount);

        var tips = query.ToList();
        var dtos = tips.Select(x => _tipMapper.Map(x)).ToList();

        return new PagedResultDto<TipDto>(totalCount, dtos);
    }

    [Authorize(EstudaZenPermissions.Tips.Create)]
    public async Task<TipDto> CreateAsync(CreateUpdateTipDto input)
    {
        var tip = new Tip(
            GuidGenerator.Create(),
            input.Title,
            input.Description,
            input.Category,
            CurrentTenant.Id
        );

        tip.Type = input.Type;
        tip.Icon = input.Icon;
        tip.IconColor = input.IconColor;
        tip.IconBgColor = input.IconBgColor;
        tip.ImageUrl = input.ImageUrl;
        tip.LinkUrl = input.LinkUrl;
        tip.IsActive = input.IsActive;
        tip.Order = input.Order;
        tip.StartDate = input.StartDate;
        tip.EndDate = input.EndDate;

        await _tipRepository.InsertAsync(tip);

        return _tipMapper.Map(tip);
    }

    [Authorize(EstudaZenPermissions.Tips.Edit)]
    public async Task<TipDto> UpdateAsync(Guid id, CreateUpdateTipDto input)
    {
        var tip = await _tipRepository.GetAsync(id);

        tip.Title = input.Title;
        tip.Description = input.Description;
        tip.Category = input.Category;
        tip.Type = input.Type;
        tip.Icon = input.Icon;
        tip.IconColor = input.IconColor;
        tip.IconBgColor = input.IconBgColor;
        tip.ImageUrl = input.ImageUrl;
        tip.LinkUrl = input.LinkUrl;
        tip.IsActive = input.IsActive;
        tip.Order = input.Order;
        tip.StartDate = input.StartDate;
        tip.EndDate = input.EndDate;

        await _tipRepository.UpdateAsync(tip);

        return _tipMapper.Map(tip);
    }

    [Authorize(EstudaZenPermissions.Tips.Delete)]
    public async Task DeleteAsync(Guid id)
    {
        await _tipRepository.DeleteAsync(id);
    }

    /// <summary>
    /// Get active tips for Home screen (no auth required for now)
    /// </summary>
    [AllowAnonymous]
    public async Task<List<TipDto>> GetActiveTipsAsync(int maxCount = 10)
    {
        var tips = await _tipRepository.GetActiveTipsAsync(maxCount);
        return tips.Select(x => _tipMapper.Map(x)).ToList();
    }
}
