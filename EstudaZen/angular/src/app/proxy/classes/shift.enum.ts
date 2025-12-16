import { mapEnumToOptions } from '@abp/ng.core';

export enum Shift {
  Morning = 0,
  Afternoon = 1,
  Evening = 2,
  FullTime = 3,
}

export const shiftOptions = mapEnumToOptions(Shift);
