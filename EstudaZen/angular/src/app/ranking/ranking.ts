import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../proxy/students/student.service';
import { RankingEntryDto } from '../proxy/students/models';
import { RankingScope } from '../proxy/students/ranking-scope.enum';
import { PagedResultDto } from '@abp/ng.core';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrls: ['./ranking.scss']
})
export class RankingComponent implements OnInit {
  private studentService = inject(StudentService);

  ranking: PagedResultDto<RankingEntryDto> = { items: [], totalCount: 0 };
  loading = true;
  scope: RankingScope = RankingScope.Global;
  rankingScopes = RankingScope; // For template access

  ngOnInit() {
    this.refreshRanking();
  }

  setScope(scope: RankingScope) {
    this.scope = scope;
    this.refreshRanking();
  }

  refreshRanking() {
    this.loading = true;
    this.studentService.getRanking({
      scope: this.scope,
      maxResultCount: 20
    }).subscribe({
      next: (res) => {
        this.ranking = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
