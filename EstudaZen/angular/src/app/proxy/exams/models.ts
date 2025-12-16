import type { EntityDto } from '@abp/ng.core';
import type { ExamSessionStatus } from './exam-session-status.enum';

export interface ExamAnswerDto extends EntityDto<string> {
  examSessionId?: string;
  questionId?: string;
  selectedAnswerId?: string;
  isCorrect: boolean;
  answeredAt?: string;
  timeSpentSeconds: number;
}

export interface ExamSessionDetailDto extends ExamSessionDto {
  answers: ExamAnswerDto[];
}

export interface ExamSessionDto extends EntityDto<string> {
  examId?: string;
  studentId?: string;
  startedAt?: string;
  finishedAt?: string;
  status?: ExamSessionStatus;
  score?: number;
  maxScore: number;
  percentageScore?: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  timeSpentMinutes?: number;
  examTitle?: string;
}

export interface SubmitAnswerDto {
  questionId: string;
  selectedAnswerId?: string;
  timeSpentSeconds: number;
}
