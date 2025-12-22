import { Environment } from '@abp/ng.core';

// Ambiente para debug: Angular local + API remota (VPS produção)
const baseUrl = 'http://localhost:4200';
const apiUrl = 'https://educa.zensuite.com.br';

const oAuthConfig = {
    issuer: apiUrl + '/',
    redirectUri: baseUrl,
    clientId: 'EstudaZen_App',
    responseType: 'code',
    scope: 'offline_access openid profile email phone EstudaZen',
    requireHttps: false, // Allow localhost redirect
};

export const environment = {
    production: false,
    application: {
        baseUrl,
        name: 'EstudaZen',
    },
    oAuthConfig,
    apis: {
        default: {
            url: apiUrl,
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
