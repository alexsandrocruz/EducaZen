import { mapEnumToOptions } from '@abp/ng.core';

export enum QuizStatus {
  InProgress = 0,
  Completed = 1,
  Abandoned = 2,
}

export const quizStatusOptions = mapEnumToOptions(QuizStatus);
