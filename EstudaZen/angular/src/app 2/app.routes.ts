import { authGuard, permissionGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(c => c.createRoutes()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(c => c.createRoutes()),
  },
  {
    path: 'tenant-management',
    loadChildren: () => import('@abp/ng.tenant-management').then(c => c.createRoutes()),
  },
  {
    path: 'setting-management',
    loadChildren: () => import('@abp/ng.setting-management').then(c => c.createRoutes()),
  },
  {
    path: 'books',
    loadComponent: () => import('./book/book.component').then(c => c.BookComponent),
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'quiz/:id',
    loadComponent: () => import('./quiz/quiz-game/quiz-game').then(c => c.QuizGameComponent),
    canActivate: [authGuard],
  },
  {
    path: 'ranking',
    loadComponent: () => import('./ranking/ranking').then(c => c.RankingComponent),
    canActivate: [authGuard],
  },
  {
    path: 'zen-design-system',
    loadChildren: () => import('./zen-design-system/zen-design-system-module').then(m => m.ZenDesignSystemModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard],
  },
];
