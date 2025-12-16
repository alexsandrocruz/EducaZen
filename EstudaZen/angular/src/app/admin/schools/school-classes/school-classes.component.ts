import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../proxy/classes/class.service';
import { ClassDto } from '../../../proxy/classes/models';
import { GradeLevel } from '../../../proxy/classes/grade-level.enum';
import { Shift } from '../../../proxy/classes/shift.enum';
import { SchoolService, SchoolDto } from '@proxy/schools';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-school-classes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './school-classes.component.html',
    styleUrls: ['./school-classes.component.scss']
})
export class SchoolClassesComponent implements OnInit {
    private classService = inject(ClassService);
    private schoolService = inject(SchoolService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private confirmation = inject(ConfirmationService);

    schoolId!: string;
    school: SchoolDto | null = null;
    classes: PagedResultDto<ClassDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    gradeLevelLabels: Record<GradeLevel, string> = {
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

    shiftLabels: Record<Shift, string> = {
        [Shift.Morning]: 'Manhã',
        [Shift.Afternoon]: 'Tarde',
        [Shift.Evening]: 'Noite',
        [Shift.FullTime]: 'Integral'
    };

    ngOnInit() {
        this.schoolId = this.route.snapshot.paramMap.get('schoolId')!;
        this.loadSchool();
        this.loadClasses();
    }

    loadSchool() {
        this.schoolService.get(this.schoolId).subscribe({
            next: (school) => {
                this.school = school;
            },
            error: (err) => console.error(err)
        });
    }

    loadClasses() {
        this.loading = true;
        this.classService.getList({
            maxResultCount: 100,
            skipCount: 0,
            schoolId: this.schoolId,
            searchTerm: this.searchTerm
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

    goBack() {
        this.router.navigate(['/admin/schools']);
    }

    createClass() {
        this.router.navigate(['/admin/schools', this.schoolId, 'classes', 'new']);
    }

    editClass(id: string) {
        this.router.navigate(['/admin/schools', this.schoolId, 'classes', 'edit', id]);
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
}
