import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatsComponent } from './user-stats/user-stats';
import { StartQuizCardComponent } from './start-quiz-card/start-quiz-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserStatsComponent, StartQuizCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {

}
