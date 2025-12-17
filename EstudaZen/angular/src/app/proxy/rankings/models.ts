import type { EntityDto } from '@abp/ng.core';
import type { ExamType } from '../exams/exam-type.enum';

export interface RankingFilterDto {
    subjectId?: string;
    schoolId?: string;
    examType?: ExamType;
    startDate?: string;
    endDate?: string;
    maxResultCount: number;
}

export interface StudentRankingDto extends EntityDto<string> {
    name: string;
    schoolName: string;
    photoUrl?: string;
    rank: number;
    score: number;
    examsCompleted: number;
}

export interface SchoolRankingDto extends EntityDto<string> {
    name: string;
    city: string;
    rank: number;
    averageScore: number;
    activeStudents: number;
}

export interface TeacherRankingDto extends EntityDto<string> {
    name: string;
    subjectName: string;
    rank: number;
    averageClassScore: number;
}
