import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subjects/subject-list/subject-list';
import { SubjectFormComponent } from './subjects/subject-form/subject-form';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { ClassListComponent } from './classes/class-list/class-list';
import { ClassFormComponent } from './classes/class-form/class-form';

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
    path: 'classes',
    children: [
      { path: '', component: ClassListComponent },
      { path: 'new', component: ClassFormComponent },
      { path: 'edit/:id', component: ClassFormComponent }
    ]
  },
  /*
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
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
