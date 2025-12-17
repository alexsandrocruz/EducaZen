import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../proxy/exams/exam.service';
import { ExamDto } from '../../../proxy/exams/models';
import { QuestionService } from '../../../proxy/questions/question.service';
import { QuestionDto } from '../../../proxy/questions/models';
import { SubjectService } from '../../../proxy/subjects/subject.service';
import { SubjectDto } from '../../../proxy/subjects/models';
import { QuestionDifficulty } from '../../../proxy/question-difficulty.enum';
import { ToasterService, ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

// View model for internal use (same as DTO for now)
import { ExamQuestionDto } from '../../../proxy/exams/exam.service';


@Component({
    selector: 'app-exam-questions',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './exam-questions.component.html',
    styleUrls: ['./exam-questions.component.scss']
})
export class ExamQuestionsComponent implements OnInit {
    private examService = inject(ExamService);
    private questionService = inject(QuestionService);
    private subjectService = inject(SubjectService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toaster = inject(ToasterService);
    private confirmation = inject(ConfirmationService);

    examId!: string;
    exam: ExamDto | null = null;
    examQuestions: ExamQuestionDto[] = [];
    availableQuestions: QuestionDto[] = [];
    subjects: SubjectDto[] = [];
    loading = true;
    showAddModal = false;
    showGenerateModal = false;

    // Filters for available questions
    filterSubjectId = '';
    filterDifficulty = '';
    filterSearchTerm = '';

    // Generate modal settings
    generateTotal = 30;
    generateSubjectId = '';
    generateMode: 'single' | 'distribution' = 'distribution';
    generateSingleDifficulty = QuestionDifficulty.Medium;
    generateEasyPercent = 30;
    generateMediumPercent = 40;
    generateHardPercent = 30;
    generateAvoidRecent = true;
    generateAvoidDays = 30;
    generatePointsPerQuestion = 10;

    difficultyLabels: Record<QuestionDifficulty, string> = {
        [QuestionDifficulty.Easy]: 'Fácil',
        [QuestionDifficulty.Medium]: 'Médio',
        [QuestionDifficulty.Hard]: 'Difícil',
        [QuestionDifficulty.Challenge]: 'Desafio'
    };

    ngOnInit() {
        this.examId = this.route.snapshot.paramMap.get('examId')!;
        this.loadData();
    }

    async loadData() {
        this.loading = true;

        // Load exam
        this.examService.get(this.examId).subscribe({
            next: (exam) => {
                this.exam = exam;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao carregar simulado');
                this.goBack();
            }
        });

        // Load subjects for filters
        this.subjectService.getList({ maxResultCount: 100, skipCount: 0 }).subscribe({
            next: (res) => this.subjects = res.items || []
        });

        // Load available questions
        this.loadAvailableQuestions();

        // Load exam questions
        this.loadExamQuestions();
    }

    loadExamQuestions() {
        this.examService.getQuestions(this.examId).subscribe({
            next: (questions) => this.examQuestions = questions,
            error: (err) => console.error(err)
        });
    }

    loadAvailableQuestions() {
        this.questionService.getList({
            maxResultCount: 500,
            skipCount: 0,
            subjectId: this.filterSubjectId || undefined,
            difficulty: this.filterDifficulty ? parseInt(this.filterDifficulty) : undefined,
            searchTerm: this.filterSearchTerm || undefined
        }).subscribe({
            next: (res) => this.availableQuestions = res.items || []
        });
    }

    goBack() {
        this.router.navigate(['/admin/exams']);
    }

    // Add single question
    addQuestion(question: QuestionDto) {
        this.examService.addQuestion(this.examId, question.id).subscribe({
            next: () => {
                this.toaster.success(`Questão adicionada`);
                this.showAddModal = false;
                this.loadExamQuestions();
                this.loadData(); // Reload exam totals
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao adicionar questão');
            }
        });
    }

    // Remove question from exam
    removeQuestion(question: ExamQuestionDto) {
        this.confirmation.warn('Remover esta questão do simulado?', 'Confirmar').subscribe((status) => {
            if (status === Confirmation.Status.confirm) {
                this.examService.removeQuestion(this.examId, question.questionId).subscribe({
                    next: () => {
                        this.toaster.success('Questão removida');
                        this.loadExamQuestions();
                        this.loadData();
                    },
                    error: (err) => {
                        console.error(err);
                        this.toaster.error('Erro ao remover questão');
                    }
                });
            }
        });
    }

    // Generate questions
    generateQuestions() {
        if (this.generateEasyPercent + this.generateMediumPercent + this.generateHardPercent !== 100) {
            this.toaster.error('Os percentuais devem somar 100%');
            return;
        }

        const input = {
            totalQuestions: this.generateTotal,
            subjectId: this.generateSubjectId || undefined,
            singleDifficulty: this.generateMode === 'single' ? this.generateSingleDifficulty : undefined,
            easyPercent: this.generateEasyPercent,
            mediumPercent: this.generateMediumPercent,
            hardPercent: this.generateHardPercent,
            avoidRecentlyUsed: this.generateAvoidRecent,
            avoidUsedInDays: this.generateAvoidDays,
            pointsPerQuestion: this.generatePointsPerQuestion
        };

        // Call generate endpoint
        this.examService.generateQuestions(this.examId, input).subscribe({
            next: (updatedExam) => {
                this.exam = updatedExam;
                this.toaster.success(`${updatedExam.totalQuestions} questões geradas!`);
                this.showGenerateModal = false;
                this.loadData();
                this.loadExamQuestions();
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao gerar questões');
            }
        });
    }

    getDifficultyLabel(difficulty: QuestionDifficulty): string {
        return this.difficultyLabels[difficulty] || 'Desconhecido';
    }

    getDifficultyClass(difficulty: QuestionDifficulty): string {
        switch (difficulty) {
            case QuestionDifficulty.Easy: return 'easy';
            case QuestionDifficulty.Medium: return 'medium';
            case QuestionDifficulty.Hard: return 'hard';
            case QuestionDifficulty.Challenge: return 'challenge';
            default: return '';
        }
    }

    stripHtml(html: string): string {
        if (!html) return '';
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}
