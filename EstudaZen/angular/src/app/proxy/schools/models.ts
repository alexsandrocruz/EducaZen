import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateSchoolDto {
  name: string;
  code?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}

export interface GetSchoolListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  city?: string;
  state?: string;
  isActive?: boolean;
}

export interface SchoolDto extends AuditedEntityDto<string> {
  tenantId?: string;
  name?: string;
  code?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}
