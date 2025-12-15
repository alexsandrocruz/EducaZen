import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyExamsRoutingModule } from './my-exams-routing.module';
import { MyExamsComponent } from './my-exams.component';

@NgModule({
    declarations: [MyExamsComponent],
    imports: [
        CommonModule,
        MyExamsRoutingModule,
    ],
})
export class MyExamsModule { }
