import type { CreateUpdateSchoolDto, GetSchoolListDto, SchoolDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateUpdateSchoolDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SchoolDto>({
      method: 'POST',
      url: '/api/app/school',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/school/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SchoolDto>({
      method: 'GET',
      url: `/api/app/school/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetSchoolListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SchoolDto>>({
      method: 'GET',
      url: '/api/app/school',
      params: { filter: input.filter, city: input.city, state: input.state, isActive: input.isActive, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateSchoolDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SchoolDto>({
      method: 'PUT',
      url: `/api/app/school/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}