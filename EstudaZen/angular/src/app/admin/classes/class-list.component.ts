import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../../../proxy/classes/class.service';
import { ClassDto } from '../../../proxy/classes/models';
import { GradeLevel } from '../../../proxy/classes/grade-level.enum';
import { Shift } from '../../../proxy/classes/shift.enum';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  private classService = inject(ClassService);
  private router = inject(Router);
  private confirmation = inject(ConfirmationService);

  classes: PagedResultDto<ClassDto> = { items: [], totalCount: 0 };
  loading = true;
  searchTerm = '';
  filterSchoolYear: number | null = null;
  filterActive: boolean | null = null;

  gradeLevelLabels = {
    [GradeLevel.Fundamental1]: '1º Fund.',
    [GradeLevel.Fundamental2]: '2º Fund.',
    [GradeLevel.Fundamental3]: '3º Fund.',
    [GradeLevel.Fundamental4]: '4º Fund.',
    [GradeLevel.Fundamental5]: '5º Fund.',
    [GradeLevel.Fundamental6]: '6º Fund.',
    [GradeLevel.Fundamental7]: '7º Fund.',
    [GradeLevel.Fundamental8]: '8º Fund.',
    [GradeLevel.Fundamental9]: '9º Fund.',
    [GradeLevel.EnsinoMedio1]: '1º Médio',
    [GradeLevel.EnsinoMedio2]: '2º Médio',
    [GradeLevel.EnsinoMedio3]: '3º Médio',
    [GradeLevel.PreVestibular]: 'Pré-Vestibular'
  };

  shiftLabels = {
    [Shift.Morning]: 'Manhã',
    [Shift.Afternoon]: 'Tarde',
    [Shift.Evening]: 'Noite',
    [Shift.FullTime]: 'Integral'
  };

  currentYear = new Date().getFullYear();
  years: number[] = [];

  ngOnInit() {
    // Generate year options (current year ± 5)
    for (let i = this.currentYear - 5; i <= this.currentYear + 5; i++) {
      this.years.push(i);
    }
    this.loadClasses();
  }

  loadClasses() {
    this.loading = true;
    this.classService.getList({
      maxResultCount: 100,
      skipCount: 0,
      searchTerm: this.searchTerm,
      schoolYear: this.filterSchoolYear,
      isActive: this.filterActive
    }).subscribe({
      next: (res) => {
        this.classes = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  createClass() {
    this.router.navigate(['/admin/classes/new']);
  }

  editClass(id: string) {
    this.router.navigate(['/admin/classes/edit', id]);
  }

  deleteClass(classItem: ClassDto) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.classService.delete(classItem.id!).subscribe(() => {
          this.loadClasses();
        });
      }
    });
  }

  getGradeLevelLabel(level: GradeLevel): string {
    return this.gradeLevelLabels[level] || 'Desconhecido';
  }

  getShiftLabel(shift: Shift): string {
    return this.shiftLabels[shift] || 'Desconhecido';
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterSchoolYear = null;
    this.filterActive = null;
    this.loadClasses();
  }
}
