import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { SubjectListComponent } from './subjects/subject-list/subject-list';
import { SubjectFormComponent } from './subjects/subject-form/subject-form';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
