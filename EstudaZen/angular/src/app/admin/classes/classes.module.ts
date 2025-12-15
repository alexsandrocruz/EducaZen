import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListComponent } from './class-list.component';

@NgModule({
    declarations: [ClassListComponent],
    imports: [
        CommonModule,
        ClassesRoutingModule,
    ],
})
export class ClassesModule { }
