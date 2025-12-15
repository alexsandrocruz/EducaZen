import type { EntityDto, PagedResultRequestDto } from '@abp/ng.core';
import type { RankingScope } from './ranking-scope.enum';
import type { StudentStatus } from './student-status.enum';

export interface GetRankingDto extends PagedResultRequestDto {
  scope?: RankingScope;
  schoolId?: string;
}

export interface RankingEntryDto {
  rank: number;
  studentId?: string;
  studentName?: string;
  avatarUrl?: string;
  schoolName?: string;
  totalXp: number;
  level: number;
  currentStreak: number;
  isCurrentUser: boolean;
}

export interface StudentDto extends EntityDto<string> {
  userId?: string;
  userName?: string;
  email?: string;
  schoolId?: string;
  schoolName?: string;
  classId?: string;
  fullName?: string;
  cpf?: string;
  birthDate?: string;
  gender?: string;
  photoUrl?: string;
  phone?: string;
  enrollmentNumber?: string;
  enrollmentDate?: string;
  status?: StudentStatus;
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  highestStreak: number;
  totalQuizzes: number;
  totalCorrectAnswers: number;
  lastActivityAt?: string;
  xpToNextLevel: number;
  xpInCurrentLevel: number;
  levelProgressPercentage: number;
}
