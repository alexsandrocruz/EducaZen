import type { RankingFilterDto, SchoolRankingDto, StudentRankingDto, TeacherRankingDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RankingService {
    apiName = 'Default';

    getStudentRanking = (input: RankingFilterDto) =>
        this.restService.request<any, StudentRankingDto[]>({
            method: 'GET',
            url: '/api/app/ranking/student-ranking',
            params: input,
        },
            { apiName: this.apiName });

    getSchoolRanking = (input: RankingFilterDto) =>
        this.restService.request<any, SchoolRankingDto[]>({
            method: 'GET',
            url: '/api/app/ranking/school-ranking',
            params: input,
        },
            { apiName: this.apiName });

    getTeacherRanking = (input: RankingFilterDto) =>
        this.restService.request<any, TeacherRankingDto[]>({
            method: 'GET',
            url: '/api/app/ranking/teacher-ranking',
            params: input,
        },
            { apiName: this.apiName });

    constructor(private restService: RestService) { }
}
