import type { QuestionDifficulty } from '../question-difficulty.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateQuestionAnswerDto {
  content: string;
  isCorrect: boolean;
}

export interface CreateQuestionDto {
  subjectId: string;
  content: string;
  explanation?: string;
  mediaUrl?: string;
  difficulty?: QuestionDifficulty;
  timeLimitSeconds: number;
  tags?: string;
  isPublished: boolean;
  answers: CreateQuestionAnswerDto[];
}

export interface GetQuestionListDto extends PagedAndSortedResultRequestDto {
  subjectId?: string;
  difficulty?: QuestionDifficulty;
  isPublished?: boolean;
  searchTerm?: string;
}

export interface QuestionAnswerDto {
  id?: string;
  content?: string;
  isCorrect: boolean;
  order: number;
  letter?: string;
}

export interface QuestionDto extends FullAuditedEntityDto<string> {
  tenantId?: string;
  subjectId?: string;
  subjectName?: string;
  content?: string;
  explanation?: string;
  mediaUrl?: string;
  difficulty?: QuestionDifficulty;
  points: number;
  timeLimitSeconds: number;
  tags?: string;
  isPublished: boolean;
  answers: QuestionAnswerDto[];
}

export interface UpdateQuestionAnswerDto {
  id?: string;
  content: string;
  isCorrect: boolean;
}

export interface UpdateQuestionDto {
  subjectId: string;
  content: string;
  explanation?: string;
  mediaUrl?: string;
  difficulty?: QuestionDifficulty;
  timeLimitSeconds: number;
  tags?: string;
  isPublished: boolean;
  answers: UpdateQuestionAnswerDto[];
}
