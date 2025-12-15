import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListSimpleComponent } from './class-list-simple.component';

const routes: Routes = [
    {
        path: '',
        component: ClassListSimpleComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClassesRoutingModule { }
