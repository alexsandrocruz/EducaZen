import { RoutesService, eLayoutType } from '@abp/ng.core';
import { inject, provideAppInitializer } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routes = inject(RoutesService);
  routes.add([
    {
      path: '/dashboard',
      name: '::Menu:Home',
      iconClass: 'fas fa-home',
      order: 1,
      layout: eLayoutType.application,
    },
    {
      path: '/books',
      name: '::Menu:Books',
      iconClass: 'fas fa-book',
      layout: eLayoutType.application,
      requiredPolicy: 'EstudaZen.Books',
    },
    // Admin Section
    {
      path: '/admin',
      name: 'Administração',
      iconClass: 'fas fa-cog',
      order: 10,
      layout: eLayoutType.application,
    },
    {
      path: '/admin/subjects',
      name: 'Matérias',
      parentName: 'Administração',
      iconClass: 'fas fa-book-open',
      order: 1,
      layout: eLayoutType.application,
    },
    {
      path: '/admin/questions',
      name: 'Questões',
      parentName: 'Administração',
      iconClass: 'fas fa-question-circle',
      order: 2,
      layout: eLayoutType.application,
    },
    {
      path: '/admin/students',
      name: 'Alunos',
      parentName: 'Administração',
      iconClass: 'fas fa-user-graduate',
      order: 3,
      layout: eLayoutType.application,
    },
    {
      path: '/admin/schools',
      name: 'Escolas',
      parentName: 'Administração',
      iconClass: 'fas fa-university',
      order: 4,
      layout: eLayoutType.application,
      requiredPolicy: 'EstudaZen.Schools',
    },
    {
      path: '/admin/exams',
      name: 'Exames e Simulados',
      parentName: 'Administração',
      iconClass: 'fas fa-file-alt',
      order: 5,
      layout: eLayoutType.application,
    },
  ]);
}
