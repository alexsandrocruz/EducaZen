import type { AnswerQuestionDto, AnswerResultDto, CurrentQuizQuestionDto, QuizDto, StartQuizDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  abandonQuiz = (quizId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/quiz/abandon-quiz/${quizId}`,
    },
    { apiName: this.apiName,...config });
  

  answer = (input: AnswerQuestionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AnswerResultDto>({
      method: 'POST',
      url: '/api/app/quiz/answer',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getActiveQuiz = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'GET',
      url: '/api/app/quiz/active-quiz',
    },
    { apiName: this.apiName,...config });
  

  getCurrentQuestion = (quizId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrentQuizQuestionDto>({
      method: 'GET',
      url: `/api/app/quiz/current-question/${quizId}`,
    },
    { apiName: this.apiName,...config });
  

  getResults = (quizId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'GET',
      url: `/api/app/quiz/results/${quizId}`,
    },
    { apiName: this.apiName,...config });
  

  startQuiz = (input: StartQuizDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizDto>({
      method: 'POST',
      url: '/api/app/quiz/start-quiz',
      body: input,
    },
    { apiName: this.apiName,...config });
}