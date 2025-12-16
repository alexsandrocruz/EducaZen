import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '@abp/ng.core';
import { SubjectListComponent } from './subjects/subject-list/subject-list';
import { SubjectFormComponent } from './subjects/subject-form/subject-form';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { ClassListComponent } from './classes/class-list/class-list';
import { ClassFormComponent } from './classes/class-form/class-form';
import { StudentListComponent } from './students/student-list/student-list.component';
import { SchoolListComponent } from './schools/school-list/school-list.component';
import { SchoolFormComponent } from './schools/school-form/school-form.component';
import { SchoolClassesComponent } from './schools/school-classes/school-classes.component';
import { StudentFormComponent } from './students/student-form/student-form.component';

const routes: Routes = [
  {
    path: 'subjects',
    children: [
      { path: '', component: SubjectListComponent },
      { path: 'new', component: SubjectFormComponent },
      { path: 'edit/:id', component: SubjectFormComponent }
    ]
  },
  {
    path: 'questions',
    children: [
      { path: '', component: QuestionListComponent },
      { path: 'new', component: QuestionFormComponent },
      { path: 'edit/:id', component: QuestionFormComponent }
    ]
  },
  {
    path: 'schools',
    children: [
      { path: '', component: SchoolListComponent },
      { path: 'new', component: SchoolFormComponent },
      { path: 'edit/:id', component: SchoolFormComponent },
      { path: ':schoolId/classes', component: SchoolClassesComponent },
      { path: ':schoolId/classes/new', component: ClassFormComponent },
      { path: ':schoolId/classes/edit/:id', component: ClassFormComponent }
    ],
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'EstudaZen.Schools',
    },
  },
  {
    path: 'students',
    children: [
      { path: '', component: StudentListComponent },
      { path: 'new', component: StudentFormComponent },
      { path: 'edit/:id', component: StudentFormComponent }
    ]
  },
  /*
  {
    path: 'exams',
    loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule)
  },
  */
  { path: '', redirectTo: 'subjects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
