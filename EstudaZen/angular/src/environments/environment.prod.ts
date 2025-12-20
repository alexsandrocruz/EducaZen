import { Environment } from '@abp/ng.core';

const baseUrl = 'https://educa.zensuite.com.br';

const oAuthConfig = {
  issuer: 'https://educa.zensuite.com.br/',
  redirectUri: baseUrl,
  clientId: 'EstudaZen_App',
  responseType: 'code',
  scope: 'offline_access openid profile email phone EstudaZen',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'EstudaZen',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://educa.zensuite.com.br',
      rootNamespace: 'EstudaZen',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
