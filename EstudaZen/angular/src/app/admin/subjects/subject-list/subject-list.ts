import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../../proxy/subjects/subject.service';
import { SubjectDto } from '../../../proxy/subjects/models';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-list.html',
  styleUrls: ['./subject-list.scss']
})
export class SubjectListComponent implements OnInit {
  private subjectService = inject(SubjectService);
  private router = inject(Router);
  private confirmation = inject(ConfirmationService);

  subjects: PagedResultDto<SubjectDto> = { items: [], totalCount: 0 };
  loading = true;
  searchTerm = '';

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.loading = true;
    this.subjectService.getList({
      maxResultCount: 100,
      skipCount: 0
    }).subscribe({
      next: (res) => {
        this.subjects = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  createSubject() {
    this.router.navigate(['/admin/subjects/new']);
  }

  editSubject(id: string) {
    this.router.navigate(['/admin/subjects/edit', id]);
  }

  deleteSubject(subject: SubjectDto) {
    this.confirmation.warn('::AreYouSure', '::AreYouSureToDelete', {
      messageLocalizationParams: [subject.name]
    }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.subjectService.delete(subject.id!).subscribe(() => {
          this.loadSubjects();
        });
      }
    });
  }

  get filteredSubjects() {
    if (!this.searchTerm) {
      return this.subjects.items;
    }
    return this.subjects.items.filter(s =>
      s.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.enemAreaCode?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
