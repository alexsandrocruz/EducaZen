import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../proxy/dashboards/dashboard.service';
import { SchoolDashboardDto } from '../../proxy/dashboards/models';

@Component({
    selector: 'app-school-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './school-dashboard.component.html',
    styleUrls: ['./school-dashboard.component.scss']
})
export class SchoolDashboardComponent implements OnInit {
    data: SchoolDashboardDto | null = null;
    loading = true;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getSchoolDashboard().subscribe(
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
