import type { HostDashboardDto, SchoolDashboardDto, TenantDashboardDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    apiName = 'Default';

    getHostDashboard = () =>
        this.restService.request<any, HostDashboardDto>({
            method: 'GET',
            url: '/api/app/dashboard/host-dashboard',
        },
            { apiName: this.apiName });

    getTenantDashboard = () =>
        this.restService.request<any, TenantDashboardDto>({
            method: 'GET',
            url: '/api/app/dashboard/tenant-dashboard',
        },
            { apiName: this.apiName });

    getSchoolDashboard = () =>
        this.restService.request<any, SchoolDashboardDto>({
            method: 'GET',
            url: '/api/app/dashboard/school-dashboard',
        },
            { apiName: this.apiName });

    constructor(private restService: RestService) { }
}
