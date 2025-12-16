import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SchoolService, CreateUpdateSchoolDto } from '@proxy/schools';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
    selector: 'app-school-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './school-form.component.html',
    styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private schoolService = inject(SchoolService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toaster = inject(ToasterService);

    form!: FormGroup;
    schoolId: string | null = null;
    isEditMode = false;
    saving = false;

    ngOnInit() {
        this.buildForm();
        this.schoolId = this.route.snapshot.paramMap.get('id');

        if (this.schoolId) {
            this.isEditMode = true;
            this.loadSchool();
        }
    }

    buildForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(200)]],
            code: ['', [Validators.maxLength(50)]],
            cnpj: ['', [Validators.maxLength(20)]],
            address: [''],
            city: ['', [Validators.maxLength(100)]],
            state: ['', [Validators.maxLength(2)]],
            zipCode: ['', [Validators.maxLength(10)]],
            phone: ['', [Validators.maxLength(20)]],
            email: ['', [Validators.email, Validators.maxLength(100)]],
            isActive: [true]
        });
    }

    loadSchool() {
        this.schoolService.get(this.schoolId!).subscribe({
            next: (data) => {
                this.form.patchValue(data);
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao carregar escola');
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
        const formData: CreateUpdateSchoolDto = this.form.value;

        const request = this.isEditMode
            ? this.schoolService.update(this.schoolId!, formData)
            : this.schoolService.create(formData);

        request.subscribe({
            next: () => {
                this.toaster.success(
                    this.isEditMode ? 'Escola atualizada!' : 'Escola criada!'
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
        this.router.navigate(['/admin/schools']);
    }

    hasError(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && control.touched);
    }

    getError(field: string): string {
        const control = this.form.get(field);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Obrigatório';
        if (control.errors['email']) return 'Email inválido';
        if (control.errors['maxlength']) return `Máx. ${control.errors['maxlength'].requiredLength} caracteres`;

        return 'Inválido';
    }
}
