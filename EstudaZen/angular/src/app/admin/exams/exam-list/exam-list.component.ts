import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../../proxy/exams/exam.service';
import { ExamDto, GetExamListDto } from '../../../proxy/exams/models';
import { ExamType } from '../../../proxy/exams/exam-type.enum';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-exam-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './exam-list.component.html',
    styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
    private examService = inject(ExamService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    exams: PagedResultDto<ExamDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    examTypeLabels: Record<ExamType, string> = {
        [ExamType.Practice]: 'Prática',
        [ExamType.Mock]: 'Simulado',
        [ExamType.ENEM]: 'ENEM',
        [ExamType.Entrance]: 'Vestibular',
        [ExamType.Custom]: 'Personalizado'
    };

    ngOnInit() {
        this.loadExams();
    }

    loadExams() {
        this.loading = true;
        this.examService.getList({
            maxResultCount: 100,
            skipCount: 0,
            filter: this.searchTerm
        } as GetExamListDto).subscribe({
            next: (res) => {
                this.exams = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    createExam() {
        this.router.navigate(['/admin/exams/new']);
    }

    editExam(id: string) {
        this.router.navigate(['/admin/exams/edit', id]);
    }

    deleteExam(exam: ExamDto) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.examService.delete(exam.id!).subscribe(() => {
                    this.loadExams();
                });
            }
        });
    }

    togglePublish(exam: ExamDto) {
        if (exam.isPublished) {
            this.examService.unpublish(exam.id!).subscribe(() => this.loadExams());
        } else {
            this.examService.publish(exam.id!).subscribe(() => this.loadExams());
        }
    }

    getExamTypeLabel(type?: ExamType): string {
        return type !== undefined ? this.examTypeLabels[type] : 'Desconhecido';
    }

    viewQuestions(examId: string) {
        this.router.navigate(['/admin/exams', examId, 'questions']);
    }

    formatDuration(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
        }
        return `${mins}min`;
    }
}
