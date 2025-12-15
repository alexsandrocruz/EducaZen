import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../proxy/subjects/subject.service';
import { CreateUpdateSubjectDto, SubjectDto } from '../../../proxy/subjects/models';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subject-form.html',
  styleUrls: ['./subject-form.scss']
})
export class SubjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private subjectService = inject(SubjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form: FormGroup;
  loading = false;
  saving = false;
  isEditMode = false;
  subjectId?: string;

  // Predefined colors for quick selection
  predefinedColors = [
    '#7f13ec', // Primary Purple
    '#FF7675', // Coral
    '#00d4ff', // Cyan
    '#10B981', // Green
    '#F59E0B', // Orange
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899', // Pink
  ];

  //Predefined icons
  predefinedIcons = [
    'book', 'calculate', 'science', 'language', 'public',
    'history', 'biotech', 'sports_soccer', 'palette', 'piano'
  ];

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      iconName: ['book'],
      colorHex: ['#7f13ec', Validators.required],
      enemAreaCode: ['', Validators.maxLength(10)],
      displayOrder: [0],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.subjectId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.subjectId;

    if (this.isEditMode && this.subjectId) {
      this.loadSubject(this.subjectId);
    }
  }

  loadSubject(id: string) {
    this.loading = true;
    this.subjectService.get(id).subscribe({
      next: (subject) => {
        this.form.patchValue({
          name: subject.name,
          iconName: subject.iconName,
          colorHex: subject.colorHex,
          enemAreaCode: subject.enemAreaCode,
          displayOrder: subject.displayOrder,
          isActive: subject.isActive
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
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
    const dto: CreateUpdateSubjectDto = this.form.value;

    const request = this.isEditMode && this.subjectId
      ? this.subjectService.update(this.subjectId, dto)
      : this.subjectService.create(dto);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/subjects']);
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin/subjects']);
  }

  selectColor(color: string) {
    this.form.patchValue({ colorHex: color });
  }

  selectIcon(icon: string) {
    this.form.patchValue({ iconName: icon });
  }
}
