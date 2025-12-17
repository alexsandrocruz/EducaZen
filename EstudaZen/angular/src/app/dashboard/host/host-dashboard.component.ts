import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../proxy/dashboards/dashboard.service';
import { HostDashboardDto } from '../../proxy/dashboards/models';

@Component({
    selector: 'app-host-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './host-dashboard.component.html',
    styleUrls: ['./host-dashboard.component.scss']
})
export class HostDashboardComponent implements OnInit {
    data: HostDashboardDto | null = null;
    loading = true;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getHostDashboard().subscribe(
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
