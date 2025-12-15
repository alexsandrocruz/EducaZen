import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../proxy/questions/question.service';
import { SubjectService } from '../../../proxy/subjects/subject.service';
import { CreateQuestionDto, UpdateQuestionDto, QuestionDto } from '../../../proxy/questions/models';
import { SubjectDto } from '../../../proxy/subjects/models';
import { QuestionDifficulty } from '../../../proxy/question-difficulty.enum';
import { QuillModule } from 'ngx-quill';
import { ToasterService, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-question-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, QuillModule],
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
    encapsulation: ViewEncapsulation.None // Enabled to style Quill internals
})
export class QuestionFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private questionService = inject(QuestionService);
    private subjectService = inject(SubjectService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private toaster = inject(ToasterService);
    private confirmation = inject(ConfirmationService);

    form: FormGroup;
    loading = false;
    saving = false;
    isEditMode = false;
    questionId?: string;
    subjects: SubjectDto[] = [];

    difficulties = [
        { value: QuestionDifficulty.Easy, label: 'Fácil' },
        { value: QuestionDifficulty.Medium, label: 'Médio' },
        { value: QuestionDifficulty.Hard, label: 'Difícil' }
    ];

    quillConfig = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
        ]
    };

    constructor() {
        this.form = this.fb.group({
            subjectId: [null, Validators.required],
            content: ['', Validators.required],
            difficulty: [QuestionDifficulty.Medium, Validators.required],
            timeLimitSeconds: [60, [Validators.required, Validators.min(10)]],
            explanation: [''],
            tags: [''],
            isPublished: [true],
            answers: this.fb.array([])
        });
    }

    get answers() {
        return this.form.get('answers') as FormArray;
    }

    ngOnInit() {
        this.loadSubjects();
        this.questionId = this.route.snapshot.params['id'];
        this.isEditMode = !!this.questionId;

        if (this.isEditMode && this.questionId) {
            this.loadQuestion(this.questionId);
        } else {
            this.addAnswer();
            this.addAnswer();
        }
    }

    loadSubjects() {
        this.subjectService.getList({ maxResultCount: 100 }).subscribe(res => {
            this.subjects = res.items || [];
        });
    }

    loadQuestion(id: string) {
        this.loading = true;
        this.questionService.get(id).subscribe({
            next: (question) => {
                this.form.patchValue({
                    subjectId: question.subjectId,
                    content: question.content,
                    difficulty: question.difficulty,
                    timeLimitSeconds: question.timeLimitSeconds,
                    explanation: question.explanation,
                    tags: question.tags,
                    isPublished: question.isPublished
                });

                this.answers.clear();
                question.answers?.forEach(ans => {
                    this.answers.push(this.fb.group({
                        id: [ans.id],
                        content: [ans.content, Validators.required],
                        isCorrect: [ans.isCorrect]
                    }));
                });

                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }

    addAnswer() {
        this.answers.push(this.fb.group({
            content: ['', Validators.required],
            isCorrect: [false]
        }));
    }

    removeAnswer(index: number) {
        this.answers.removeAt(index);
    }

    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toaster.error('Por favor, preencha todos os campos obrigatórios.', 'Formulário Inválido');
            return;
        }

        const answers = this.form.value.answers;
        if (!answers || answers.length === 0) {
            this.confirmation.error('Adicione pelo menos uma alternativa.', 'Alternativas');
            return;
        }

        if (!answers.some((a: any) => a.isCorrect)) {
            this.confirmation.error('Selecione pelo menos uma alternativa correta para a questão.', 'Atenção');
            return;
        }

        this.saving = true;
        const formValue = this.form.value;

        const commonDto = {
            subjectId: formValue.subjectId,
            content: formValue.content,
            difficulty: Number(formValue.difficulty),
            timeLimitSeconds: Number(formValue.timeLimitSeconds),
            explanation: formValue.explanation || null,
            tags: formValue.tags || null,
            isPublished: formValue.isPublished
        };

        const answersDto = formValue.answers.map((a: any) => ({
            content: a.content || '',
            isCorrect: !!a.isCorrect
        }));

        let request;
        if (this.isEditMode && this.questionId) {
            const updateDto = {
                ...commonDto,
                answers: answersDto.map((a: any, index: number) => ({
                    ...a,
                    id: formValue.answers[index].id
                }))
            };
            request = this.questionService.update(this.questionId, updateDto);
        } else {
            const createDto = {
                ...commonDto,
                answers: answersDto
            };
            request = this.questionService.create(createDto);
        }

        request.subscribe({
            next: () => {
                this.saving = false;
                this.toaster.success('Questão salva com sucesso!', 'Sucesso');
                this.router.navigate(['/admin/questions']);
            },
            error: (err) => {
                console.error('Error saving question:', err);
                this.toaster.error(err.error?.message || 'Ocorreu um erro ao salvar a questão.', 'Erro');
                this.saving = false;
            }
        });
    }

    cancel() {
        this.router.navigate(['/admin/questions']);
    }
}
