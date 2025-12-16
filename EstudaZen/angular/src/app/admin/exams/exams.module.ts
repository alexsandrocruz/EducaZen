import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamListComponent } from './exam-list.component';

@NgModule({
    declarations: [ExamListComponent],
    imports: [
        CommonModule,
        ExamsRoutingModule,
    ],
})
export class ExamsModule { }
