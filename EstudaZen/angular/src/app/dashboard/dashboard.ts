import { ConfigStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatsComponent } from './user-stats/user-stats';
import { StartQuizCardComponent } from './start-quiz-card/start-quiz-card';
import { HostDashboardComponent } from './host/host-dashboard.component';
import { TenantDashboardComponent } from './tenant/tenant-dashboard.component';
import { SchoolDashboardComponent } from './school/school-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UserStatsComponent,
    StartQuizCardComponent,
    HostDashboardComponent,
    TenantDashboardComponent,
    SchoolDashboardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  constructor(private config: ConfigStateService) { }

  get isHost(): boolean {
    return !this.config.getDeep('currentUser.tenantId');
  }

  get isTenant(): boolean {
    return !!this.config.getDeep('currentUser.tenantId');
  }

  // Simple check if user is NOT just a student (assuming admins have other roles)
  // Or simply, if they are admin, show dashboard.
  get isStudent(): boolean {
    const roles = this.config.getDeep('currentUser.roles') as string[] || [];
    return roles.includes('student');
  }
}
