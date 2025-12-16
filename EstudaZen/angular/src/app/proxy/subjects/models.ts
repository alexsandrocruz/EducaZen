import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateSubjectDto {
  name: string;
  iconName?: string;
  colorHex?: string;
  enemAreaCode?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SubjectDto extends FullAuditedEntityDto<string> {
  name?: string;
  iconName?: string;
  colorHex?: string;
  enemAreaCode?: string;
  displayOrder: number;
  isActive: boolean;
}
