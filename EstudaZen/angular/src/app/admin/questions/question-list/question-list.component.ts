import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../proxy/questions/question.service';
import { QuestionDto } from '../../../proxy/questions/models';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { QuestionDifficulty } from '../../../proxy/question-difficulty.enum';

@Component({
    selector: 'app-question-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
    private questionService = inject(QuestionService);
    private router = inject(Router);
    private confirmation = inject(ConfirmationService);

    questions: PagedResultDto<QuestionDto> = { items: [], totalCount: 0 };
    loading = true;
    searchTerm = '';

    difficultyLabels = {
        [QuestionDifficulty.Easy]: 'Fácil',
        [QuestionDifficulty.Medium]: 'Médio',
        [QuestionDifficulty.Hard]: 'Difícil'
    };

    difficultyColors = {
        [QuestionDifficulty.Easy]: 'success',
        [QuestionDifficulty.Medium]: 'warning',
        [QuestionDifficulty.Hard]: 'error'
    };

    ngOnInit() {
        this.loadQuestions();
    }

    loadQuestions() {
        this.loading = true;
        this.questionService.getList({
            maxResultCount: 100,
            skipCount: 0,
            searchTerm: this.searchTerm
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
