import type { ExamAnswerDto, ExamSessionDetailDto, ExamSessionDto, SubmitAnswerDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamSessionService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  abandonExam = (sessionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDto>({
      method: 'POST',
      url: `/api/app/exam-session/abandon-exam/${sessionId}`,
    },
    { apiName: this.apiName,...config });
  

  finishExam = (sessionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDto>({
      method: 'POST',
      url: `/api/app/exam-session/finish-exam/${sessionId}`,
    },
    { apiName: this.apiName,...config });
  

  getMyActiveSession = (examId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDto>({
      method: 'GET',
      url: `/api/app/exam-session/my-active-session/${examId}`,
    },
    { apiName: this.apiName,...config });
  

  getMySessions = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDto[]>({
      method: 'GET',
      url: '/api/app/exam-session/my-sessions',
    },
    { apiName: this.apiName,...config });
  

  getSessionDetail = (sessionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDetailDto>({
      method: 'GET',
      url: `/api/app/exam-session/session-detail/${sessionId}`,
    },
    { apiName: this.apiName,...config });
  

  startExam = (examId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamSessionDto>({
      method: 'POST',
      url: `/api/app/exam-session/start-exam/${examId}`,
    },
    { apiName: this.apiName,...config });
  

  submitAnswer = (sessionId: string, input: SubmitAnswerDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ExamAnswerDto>({
      method: 'POST',
      url: `/api/app/exam-session/submit-answer/${sessionId}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}