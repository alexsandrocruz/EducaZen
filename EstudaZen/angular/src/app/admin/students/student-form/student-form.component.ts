import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../proxy/students/student.service';
import { ClassService } from '../../../proxy/classes/class.service';
import { CreateUpdateStudentDto, StudentDto } from '../../../proxy/students/models';
import { StudentStatus } from '../../../proxy/students/student-status.enum';
import { ToasterService } from '@abp/ng.theme.shared';
import { ClassDto } from '../../../proxy/classes/models';

@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private studentService = inject(StudentService);
    private classService = inject(ClassService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private toaster = inject(ToasterService);

    form!: FormGroup;
    studentId: string | null = null;
    isEditMode = false;
    saving = false;

    classes: ClassDto[] = [];

    statusOptions = [
        { value: StudentStatus.Active, label: 'Ativo' },
        { value: StudentStatus.Inactive, label: 'Inativo' },
        { value: StudentStatus.Suspended, label: 'Suspenso' },
        { value: StudentStatus.Graduated, label: 'Formado' },
        { value: StudentStatus.Transferred, label: 'Transferido' }
    ];

    genderOptions = [
        { value: 'Male', label: 'Masculino' },
        { value: 'Female', label: 'Feminino' },
        { value: 'Other', label: 'Outro' },
        { value: 'PreferNotToSay', label: 'Prefiro não informar' }
    ];

    ngOnInit() {
        this.buildForm();
        this.loadClasses();

        this.studentId = this.route.snapshot.paramMap.get('id');

        if (this.studentId) {
            this.isEditMode = true;
            this.loadStudent();
        }
    }

    buildForm() {
        this.form = this.fb.group({
            fullName: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
            cpf: ['', [Validators.maxLength(14)]],
            birthDate: [null, [Validators.required]],
            phone: ['', [Validators.maxLength(20)]],
            gender: ['PreferNotToSay'],
            classId: [null],
            status: [StudentStatus.Active, [Validators.required]]
        });
    }

    loadClasses() {
        this.classService.getList({ maxResultCount: 100 }).subscribe({
            next: (res) => {
                this.classes = res.items;
            },
            error: (err) => console.error(err)
        });
    }

    loadStudent() {
        this.studentService.get(this.studentId!).subscribe({
            next: (data) => {
                // Fix date format for input date
                let birthDate = data.birthDate ? data.birthDate.split('T')[0] : null;

                this.form.patchValue({
                    ...data,
                    birthDate: birthDate
                });
            },
            error: (err) => {
                console.error(err);
                this.toaster.error('Erro ao carregar aluno');
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

        const formData = { ...this.form.value };

        const request = this.isEditMode
            ? this.studentService.update(this.studentId!, formData as CreateUpdateStudentDto)
            : this.studentService.create(formData as CreateUpdateStudentDto);

        request.subscribe({
            next: () => {
                this.toaster.success(
                    this.isEditMode ? 'Aluno atualizado!' : 'Aluno criado!'
                );
                this.goBack();
            },
            error: (err) => {
                console.error(err);
                const errorMsg = err.error?.error?.message || 'Erro ao salvar';
                if (errorMsg.includes('NotImplementedException')) {
                    this.toaster.error('A criação de novos alunos ainda não está disponível (Requer fluxo de convite). Tente Editar.');
                } else {
                    this.toaster.error(errorMsg);
                }
                this.saving = false;
            }
        });
    }

    goBack() {
        this.router.navigate(['/admin/students']);
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
