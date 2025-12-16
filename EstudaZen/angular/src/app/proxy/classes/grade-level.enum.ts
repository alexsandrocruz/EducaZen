import { mapEnumToOptions } from '@abp/ng.core';

export enum GradeLevel {
  Fundamental1 = 1,
  Fundamental2 = 2,
  Fundamental3 = 3,
  Fundamental4 = 4,
  Fundamental5 = 5,
  Fundamental6 = 6,
  Fundamental7 = 7,
  Fundamental8 = 8,
  Fundamental9 = 9,
  EnsinoMedio1 = 10,
  EnsinoMedio2 = 11,
  EnsinoMedio3 = 12,
  PreVestibular = 13,
}

export const gradeLevelOptions = mapEnumToOptions(GradeLevel);
