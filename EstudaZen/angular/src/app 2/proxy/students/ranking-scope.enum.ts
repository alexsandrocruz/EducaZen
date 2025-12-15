import { mapEnumToOptions } from '@abp/ng.core';

export enum RankingScope {
  School = 0,
  Tenant = 1,
  Global = 2,
}

export const rankingScopeOptions = mapEnumToOptions(RankingScope);
