import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../proxy/dashboards/dashboard.service';
import { TenantDashboardDto } from '../../proxy/dashboards/models';

@Component({
    selector: 'app-tenant-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tenant-dashboard.component.html',
    styleUrls: ['./tenant-dashboard.component.scss']
})
export class TenantDashboardComponent implements OnInit {
    data: TenantDashboardDto | null = null;
    loading = true;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getTenantDashboard().subscribe(
            (res) => {
                this.data = res;
                this.loading = false;
            },
            (err) => {
                console.error(err);
                this.loading = false;
            }
        );
    }
}
