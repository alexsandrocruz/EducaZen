import type { CreateQuestionDto, GetQuestionListDto, QuestionDto, UpdateQuestionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'POST',
      url: '/api/app/question',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'GET',
      url: `/api/app/question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetQuestionListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<QuestionDto>>({
      method: 'GET',
      url: '/api/app/question',
      params: { subjectId: input.subjectId, difficulty: input.difficulty, isPublished: input.isPublished, searchTerm: input.searchTerm, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionDto>({
      method: 'PUT',
      url: `/api/app/question/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}