import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListComponent } from './class-list.component';
import { ClassFormComponent } from './class-form.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ClassesRoutingModule,
        ClassListComponent,
        ClassFormComponent,
    ],
})
export class ClassesModule { }
