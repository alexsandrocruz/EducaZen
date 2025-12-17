import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { QuestionDifficulty } from '../question-difficulty.enum';
import type { ExamType } from './exam-type.enum';

export interface ExamDto extends FullAuditedEntityDto<string> {
  tenantId?: string;
  schoolId?: string;
  title?: string;
  description?: string;
  type?: ExamType;
  difficulty?: QuestionDifficulty;
  totalQuestions: number;
  durationMinutes: number;
  totalPoints: number;
  availableFrom?: string;
  availableUntil?: string;
  isPublished: boolean;
  publishedAt?: string;
  showCorrectAnswers: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export interface CreateUpdateExamDto {
  title: string;
  description?: string;
  type?: ExamType;
  difficulty?: QuestionDifficulty;
  durationMinutes: number;
  availableFrom?: string;
  availableUntil?: string;
  showCorrectAnswers: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  schoolId?: string;
}

export interface GetExamListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  schoolId?: string;
  type?: ExamType;
  isPublished?: boolean;
}

export interface ExamAnswerDto {
  examSessionId?: string;
  questionId?: string;
  selectedAnswerId?: string;
  isCorrect: boolean;
  answeredAt?: string;
  timeSpentSeconds: number;
}
