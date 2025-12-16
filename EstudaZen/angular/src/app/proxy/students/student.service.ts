import type { CreateUpdateStudentDto, GetRankingDto, GetStudentListDto, RankingEntryDto, StudentDto } from './models';
import type { RankingScope } from './ranking-scope.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateUpdateStudentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudentDto>({
      method: 'POST',
      url: '/api/app/student',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/student/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudentDto>({
      method: 'GET',
      url: `/api/app/student/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetStudentListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<StudentDto>>({
      method: 'GET',
      url: '/api/app/student',
      params: { filter: input.filter, classId: input.classId, status: input.status, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getMyProfile = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudentDto>({
      method: 'GET',
      url: '/api/app/student/my-profile',
    },
    { apiName: this.apiName,...config });
  

  getMyRanking = (scope: RankingScope, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RankingEntryDto>({
      method: 'GET',
      url: '/api/app/student/my-ranking',
      params: { scope },
    },
    { apiName: this.apiName,...config });
  

  getRanking = (input: GetRankingDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RankingEntryDto>>({
      method: 'GET',
      url: '/api/app/student/ranking',
      params: { scope: input.scope, schoolId: input.schoolId, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateStudentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudentDto>({
      method: 'PUT',
      url: `/api/app/student/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}