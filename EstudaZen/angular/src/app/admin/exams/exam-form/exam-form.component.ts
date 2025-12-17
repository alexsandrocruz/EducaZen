import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../../proxy/exams/exam.service';
import { CreateUpdateExamDto } from '../../../proxy/exams/models';
import { ExamType } from '../../../proxy/exams/exam-type.enum';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-exam-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './exam-form.component.html',
    styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private examService = inject(ExamService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toaster = inject(ToasterService);

    form!: FormGroup;
    examId: string | null = null;
    isEditMode = false;
    saving = false;

    examTypes = [
        { value: ExamType.Practice, label: 'Prática Rápida' },
        { value: ExamType.Mock, label: 'Simulado' },
        { value: ExamType.ENEM, label: 'ENEM' },
        { value: ExamType.Entrance, label: 'Vestibular' },
        { value: ExamType.Custom, label: 'Personalizado' }
    ];

    ngOnInit() {
        this.buildForm();
        this.examId = this.route.snapshot.paramMap.get('id');

        if (this.examId) {
            this.isEditMode = true;
            this.loadExam();
        }
    }

    buildForm() {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', [Validators.maxLength(2000)]],
            type: [ExamType.Mock, Validators.required],
            durationMinutes: [180, [Validators.required, Validators.min(1), Validators.max(600)]],
            availableFrom: [null],
            availableUntil: [null],
            showCorrectAnswers: [true],
            randomizeQuestions: [false],
            randomizeOptions: [false]
        });
    }

    loadExam() {
        this.examService.get(this.examId!).subscribe({
            next: (data) => {
                // Format dates for input
                const availableFrom = data.availableFrom ? data.availableFrom.split('T')[0] : null;
                const availableUntil = data.availableUntil ? data.availableUntil.split('T')[0] : null;

                this.form.patchValue({
                    ...data,
                    availableFrom,
                    availableUntil
                });
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao carregar simulado');
                this.goBack();
            }
        });
    }

    save() {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        this.saving = true;
        const formData: CreateUpdateExamDto = this.form.value;

        const request = this.isEditMode
            ? this.examService.update(this.examId!, formData)
            : this.examService.create(formData);

        request.subscribe({
            next: () => {
                this.toaster.success(
                    this.isEditMode ? 'Simulado atualizado!' : 'Simulado criado!'
                );
                this.goBack();
            },
            error: (err) => {
                console.error(err);
                const errorMsg = err.error?.error?.message || 'Erro ao salvar';
                this.toaster.error(errorMsg);
                this.saving = false;
            }
        });
    }

    goBack() {
        this.router.navigate(['/admin/exams']);
    }

    hasError(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && control.touched);
    }

    getError(field: string): string {
        const control = this.form.get(field);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Obrigatório';
        if (control.errors['maxlength']) return `Máx. ${control.errors['maxlength'].requiredLength} caracteres`;
        if (control.errors['min']) return `Mínimo: ${control.errors['min'].min}`;
        if (control.errors['max']) return `Máximo: ${control.errors['max'].max}`;

        return 'Inválido';
    }
}
