import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyExamsComponent } from './my-exams.component';

const routes: Routes = [
    {
        path: '',
        component: MyExamsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyExamsRoutingModule { }
