import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListComponent } from './class-list.component';
import { ClassFormComponent } from './class-form.component';

const routes: Routes = [
    {
        path: '',
        component: ClassListComponent,
    },
    {
        path: 'new',
        component: ClassFormComponent,
    },
    {
        path: 'edit/:id',
        component: ClassFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClassesRoutingModule { }
