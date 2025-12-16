import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { GradeLevel } from './grade-level.enum';
import type { Shift } from './shift.enum';

export interface ClassDto extends FullAuditedEntityDto<string> {
  tenantId?: string;
  schoolId?: string;
  name?: string;
  code?: string;
  gradeLevel?: GradeLevel;
  shift?: Shift;
  schoolYear: number;
  maxStudents?: number;
  isActive: boolean;
  studentCount: number;
}

export interface CreateClassDto {
  schoolId: string;
  name: string;
  code: string;
  gradeLevel?: GradeLevel;
  shift?: Shift;
  schoolYear: number;
  maxStudents?: number;
  isActive: boolean;
}

export interface GetClassListDto extends PagedAndSortedResultRequestDto {
  schoolId?: string;
  schoolYear?: number;
  isActive?: boolean;
  searchTerm?: string;
}

export interface UpdateClassDto {
  name: string;
  code: string;
  gradeLevel?: GradeLevel;
  shift?: Shift;
  schoolYear: number;
  maxStudents?: number;
  isActive: boolean;
}
