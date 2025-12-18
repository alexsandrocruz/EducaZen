import { Routes } from '@angular/router';
import { TipListComponent } from './tip-list/tip-list.component';
import { TipFormComponent } from './tip-form/tip-form.component';

export const TIPS_ROUTES: Routes = [
    {
        path: '',
        component: TipListComponent
    },
    {
        path: 'new',
        component: TipFormComponent
    },
    {
        path: 'edit/:id',
        component: TipFormComponent
    }
];
