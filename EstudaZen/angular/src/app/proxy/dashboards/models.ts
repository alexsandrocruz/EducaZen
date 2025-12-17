import type { SchoolRankingDto, StudentRankingDto, TeacherRankingDto } from '../rankings/models';

export interface SubscriptionHealthDto {
    total: number;
    active: number;
    trial: number;
    expired: number;
}

export interface ActivityFeedItemDto {
    title: string;
    description: string;
    status: string;
    imageUrl?: string;
}

export interface HostDashboardDto {
    totalMrr: number;
    activeCities: number;
    totalStudents: number;
    subscriptionHealth: SubscriptionHealthDto;
    recentUpdates: ActivityFeedItemDto[];
}

export interface TenantDashboardDto {
    totalSchools: number;
    totalStudents: number;
    averageScore: number;
    topSchools: SchoolRankingDto[];
    schoolsNeedingSupport: SchoolRankingDto[];
}

export interface SchoolDashboardDto {
    activeStudents: number;
    totalExamsTaken: number;
    averageScore: number;
    topStudents: StudentRankingDto[];
    studentsNeedingSupport: StudentRankingDto[];
    teachersNeedingSupport: TeacherRankingDto[];
}
