import type { GetRankingDto, RankingEntryDto, StudentDto } from './models';
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
}