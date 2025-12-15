import { mapEnumToOptions } from '@abp/ng.core';

export enum StudentStatus {
  Active = 0,
  Inactive = 1,
  Transferred = 2,
  Graduated = 3,
  Suspended = 4,
}

export const studentStatusOptions = mapEnumToOptions(StudentStatus);
