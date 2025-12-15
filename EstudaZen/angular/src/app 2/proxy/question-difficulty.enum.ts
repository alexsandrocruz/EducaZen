import { mapEnumToOptions } from '@abp/ng.core';

export enum QuestionDifficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  Challenge = 3,
}

export const questionDifficultyOptions = mapEnumToOptions(QuestionDifficulty);
