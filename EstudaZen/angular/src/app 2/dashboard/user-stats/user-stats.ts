import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../proxy/students/student.service';
import { StudentDto } from '../../proxy/students/models';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats.html',
  styleUrls: ['./user-stats.scss']
})
export class UserStatsComponent implements OnInit {
  private studentService = inject(StudentService);
  student: StudentDto | null = null;
  loading = true;

  ngOnInit() {
    this.studentService.getMyProfile().subscribe({
      next: (res) => {
        this.student = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
