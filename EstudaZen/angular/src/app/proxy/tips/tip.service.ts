import { Injectable, inject } from '@angular/core';
import { RestService, PagedResultDto } from '@abp/ng.core';
import { TipDto, CreateUpdateTipDto, GetTipListDto } from './models';

@Injectable({
    providedIn: 'root'
})
export class TipService {
    private rest = inject(RestService);
    private apiName = 'Default';

    getList = (input: GetTipListDto) =>
        this.rest.request<void, PagedResultDto<TipDto>>({
            method: 'GET',
            url: '/api/app/tip',
            params: {
                skipCount: input.skipCount,
                maxResultCount: input.maxResultCount,
                sorting: input.sorting,
                category: input.category,
                isActive: input.isActive,
                filter: input.filter
            }
        }, { apiName: this.apiName });

    get = (id: string) =>
        this.rest.request<void, TipDto>({
            method: 'GET',
            url: `/api/app/tip/${id}`
        }, { apiName: this.apiName });

    create = (input: CreateUpdateTipDto) =>
        this.rest.request<CreateUpdateTipDto, TipDto>({
            method: 'POST',
            url: '/api/app/tip',
            body: input
        }, { apiName: this.apiName });

    update = (id: string, input: CreateUpdateTipDto) =>
        this.rest.request<CreateUpdateTipDto, TipDto>({
            method: 'PUT',
            url: `/api/app/tip/${id}`,
            body: input
        }, { apiName: this.apiName });

    delete = (id: string) =>
        this.rest.request<void, void>({
            method: 'DELETE',
            url: `/api/app/tip/${id}`
        }, { apiName: this.apiName });

    getActiveTips = (maxCount: number = 10) =>
        this.rest.request<void, TipDto[]>({
            method: 'GET',
            url: '/api/app/tip/active-tips',
            params: { maxCount }
        }, { apiName: this.apiName });
}
