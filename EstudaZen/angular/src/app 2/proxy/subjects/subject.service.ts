import type { CreateUpdateSubjectDto, SubjectDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateUpdateSubjectDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubjectDto>({
      method: 'POST',
      url: '/api/app/subject',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/subject/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubjectDto>({
      method: 'GET',
      url: `/api/app/subject/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SubjectDto>>({
      method: 'GET',
      url: '/api/app/subject',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateSubjectDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubjectDto>({
      method: 'PUT',
      url: `/api/app/subject/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}