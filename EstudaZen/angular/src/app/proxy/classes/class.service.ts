import type { ClassDto, CreateClassDto, GetClassListDto, UpdateClassDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateClassDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClassDto>({
      method: 'POST',
      url: '/api/app/class',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/class/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClassDto>({
      method: 'GET',
      url: `/api/app/class/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetClassListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ClassDto>>({
      method: 'GET',
      url: '/api/app/class',
      params: { schoolId: input.schoolId, schoolYear: input.schoolYear, isActive: input.isActive, searchTerm: input.searchTerm, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateClassDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ClassDto>({
      method: 'PUT',
      url: `/api/app/class/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}