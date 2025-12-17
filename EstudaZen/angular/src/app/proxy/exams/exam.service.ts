import { Injectable } from '@angular/core';
import { RestService, PagedResultDto } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { ExamDto, CreateUpdateExamDto, GetExamListDto } from './models';
import { QuestionDifficulty } from '../question-difficulty.enum';

export interface ExamQuestionDto {
    id: string;
    examId: string;
    questionId: string;
    content: string;
    difficulty: QuestionDifficulty;
    subjectId: string;
    points: number;
    order: number;
}


@Injectable({
    providedIn: 'root',
})
export class ExamService {
    apiName = 'Default';

    constructor(private restService: RestService) { }

    getList = (input: GetExamListDto): Observable<PagedResultDto<ExamDto>> =>
        this.restService.request<any, PagedResultDto<ExamDto>>({
            method: 'GET',
            url: '/api/app/exam',
            params: {
                filter: input.filter,
                schoolId: input.schoolId,
                type: input.type,
                isPublished: input.isPublished,
                sorting: input.sorting,
                skipCount: input.skipCount,
                maxResultCount: input.maxResultCount,
            },
        }, { apiName: this.apiName });

    get = (id: string): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'GET',
            url: `/api/app/exam/${id}`,
        }, { apiName: this.apiName });

    create = (input: CreateUpdateExamDto): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'POST',
            url: '/api/app/exam',
            body: input,
        }, { apiName: this.apiName });

    update = (id: string, input: CreateUpdateExamDto): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'PUT',
            url: `/api/app/exam/${id}`,
            body: input,
        }, { apiName: this.apiName });

    delete = (id: string): Observable<void> =>
        this.restService.request<any, void>({
            method: 'DELETE',
            url: `/api/app/exam/${id}`,
        }, { apiName: this.apiName });

    publish = (id: string): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'POST',
            url: `/api/app/exam/${id}/publish`,
        }, { apiName: this.apiName });

    unpublish = (id: string): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'POST',
            url: `/api/app/exam/${id}/unpublish`,
        }, { apiName: this.apiName });

    generateQuestions = (id: string, input: GenerateExamQuestionsDto): Observable<ExamDto> =>
        this.restService.request<any, ExamDto>({
            method: 'POST',
            url: `/api/app/exam/${id}/generate-questions`,
            body: input,
        }, { apiName: this.apiName });

    getQuestions = (id: string): Observable<ExamQuestionDto[]> =>
        this.restService.request<any, ExamQuestionDto[]>({
            method: 'GET',
            url: `/api/app/exam/${id}/questions`,
        }, { apiName: this.apiName });

    addQuestion = (id: string, questionId: string): Observable<void> =>
        this.restService.request<any, void>({
            method: 'POST',
            url: `/api/app/exam/${id}/question/${questionId}`,
        }, { apiName: this.apiName });

    removeQuestion = (id: string, questionId: string): Observable<void> =>
        this.restService.request<any, void>({
            method: 'DELETE',
            url: `/api/app/exam/${id}/question/${questionId}`,
        }, { apiName: this.apiName });
}

export interface GenerateExamQuestionsDto {
    totalQuestions: number;
    subjectId?: string;
    singleDifficulty?: number;
    easyPercent: number;
    mediumPercent: number;
    hardPercent: number;
    avoidRecentlyUsed: boolean;
    avoidUsedInDays: number;
    pointsPerQuestion: number;
}
