import { mapEnumToOptions } from '@abp/ng.core';

export enum ExamSessionStatus {
  InProgress = 0,
  Completed = 1,
  Abandoned = 2,
  TimedOut = 3,
}

export const examSessionStatusOptions = mapEnumToOptions(ExamSessionStatus);
