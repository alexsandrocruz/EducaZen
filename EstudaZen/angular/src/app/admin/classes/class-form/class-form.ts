import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClassService } from '../../../proxy/classes/class.service';
import { CreateClassDto, UpdateClassDto } from '../../../proxy/classes/models';
import { GradeLevel } from '../../../proxy/classes/grade-level.enum';
import { Shift } from '../../../proxy/classes/shift.enum';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-form.html',
  styleUrls: ['./class-form.scss']
})
export class ClassFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private classService = inject(ClassService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toaster = inject(ToasterService);

  form!: FormGroup;
  classId: string | null = null;
  isEditMode = false;
  saving = false;

  gradeLevels = [
    { value: GradeLevel.Fundamental1, label: '1º Ano - Fundamental' },
    { value: GradeLevel.Fundamental2, label: '2º Ano - Fundamental' },
    { value: GradeLevel.Fundamental3, label: '3º Ano - Fundamental' },
    { value: GradeLevel.Fundamental4, label: '4º Ano - Fundamental' },
    { value: GradeLevel.Fundamental5, label: '5º Ano - Fundamental' },
    { value: GradeLevel.Fundamental6, label: '6º Ano - Fundamental' },
    { value: GradeLevel.Fundamental7, label: '7º Ano - Fundamental' },
    { value: GradeLevel.Fundamental8, label: '8º Ano - Fundamental' },
    { value: GradeLevel.Fundamental9, label: '9º Ano - Fundamental' },
    { value: GradeLevel.EnsinoMedio1, label: '1º Ano - Ensino Médio' },
    { value: GradeLevel.EnsinoMedio2, label: '2º Ano - Ensino Médio' },
    { value: GradeLevel.EnsinoMedio3, label: '3º Ano - Ensino Médio' },
    { value: GradeLevel.PreVestibular, label: 'Pré-Vestibular' }
  ];

  shifts = [
    { value: Shift.Morning, label: 'Manhã' },
    { value: Shift.Afternoon, label: 'Tarde' },
    { value: Shift.Evening, label: 'Noite' },
    { value: Shift.FullTime, label: 'Integral' }
  ];

  ngOnInit() {
    this.buildForm();
    this.classId = this.route.snapshot.paramMap.get('id');

    if (this.classId) {
      this.isEditMode = true;
      this.loadClass();
    }
  }

  buildForm() {
    const currentYear = new Date().getFullYear();

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      gradeLevel: [GradeLevel.EnsinoMedio1, Validators.required],
      shift: [Shift.Morning, Validators.required],
      schoolYear: [currentYear, [Validators.required, Validators.min(2000), Validators.max(2099)]],
      maxStudents: [null],
      isActive: [true]
    });
  }

  loadClass() {
    this.classService.get(this.classId!).subscribe({
      next: (data) => {
        this.form.patchValue(data);
      },
      error: (err) => {
        console.error(err);
        this.toaster.error('Erro ao carregar turma');
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
      ? this.classService.update(this.classId!, formData as UpdateClassDto)
      : this.classService.create(formData as CreateClassDto);

    request.subscribe({
      next: () => {
        this.toaster.success(
          this.isEditMode ? 'Turma atualizada!' : 'Turma criada!'
        );
        this.goBack();
      },
      error: (err) => {
        console.error(err);
        const errorMsg = err.error?.error?.message || 'Erro ao salvar';
        if (errorMsg.includes('ClassCodeAlreadyExists')) {
          this.toaster.error('Já existe uma turma com este código neste ano.');
        } else {
          this.toaster.error(errorMsg);
        }
        this.saving = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/classes']);
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
