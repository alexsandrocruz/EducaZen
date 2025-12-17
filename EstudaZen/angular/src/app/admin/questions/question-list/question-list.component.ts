import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../proxy/questions/question.service';
import { QuestionDto } from '../../../proxy/questions/models';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { QuestionDifficulty } from '../../../proxy/question-difficulty.enum';

import { SubjectService } from '../../../proxy/subjects/subject.service';
import { SubjectDto } from '../../../proxy/subjects/models';

@Component({
    selector: 'app-question-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
    private questionService = inject(QuestionService);
    private subjectService = inject(SubjectService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    questions: PagedResultDto<QuestionDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    // Filters
    filterSubjectId = '';
    filterDifficulty = '';

    subjects: SubjectDto[] = [];

    difficultyLabels = {
        [QuestionDifficulty.Easy]: 'Fácil',
        [QuestionDifficulty.Medium]: 'Médio',
        [QuestionDifficulty.Hard]: 'Difícil',
        [QuestionDifficulty.Challenge]: 'Desafio'
    };

    difficultyColors = {
        [QuestionDifficulty.Easy]: 'success',
        [QuestionDifficulty.Medium]: 'warning',
        [QuestionDifficulty.Hard]: 'error',
        [QuestionDifficulty.Challenge]: 'primary'
    };

    ngOnInit() {
        this.loadSubjects();
        this.loadQuestions();
    }

    loadSubjects() {
        this.subjectService.getList({ maxResultCount: 100 }).subscribe({
            next: (res) => this.subjects = res.items || []
        });
    }

    loadQuestions() {
        this.loading = true;
        this.questionService.getList({
            maxResultCount: 100,
            skipCount: 0,
            searchTerm: this.searchTerm || undefined,
            subjectId: this.filterSubjectId || undefined,
            difficulty: this.filterDifficulty ? parseInt(this.filterDifficulty) : undefined
        }).subscribe({
            next: (res) => {
                this.questions = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    createQuestion() {
        this.router.navigate(['/admin/questions/new']);
    }

    editQuestion(id: string) {
        this.router.navigate(['/admin/questions/edit', id]);
    }

    deleteQuestion(question: QuestionDto) {
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.questionService.delete(question.id!).subscribe(() => {
                    this.loadQuestions();
                });
            }
        });
    }

    getDifficultyLabel(difficulty: QuestionDifficulty): string {
        return this.difficultyLabels[difficulty] || 'Desconhecido';
    }

    getDifficultyColor(difficulty: QuestionDifficulty): string {
        return this.difficultyColors[difficulty] || 'primary';
    }

    stripHtml(html: string): string {
        if (!html) return '';
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}
