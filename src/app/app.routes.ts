// app.routing.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pdf-template',
    loadComponent: () =>
      import('./pages/pdf-templates/pdf-templates.component').then(m => m.PdfTemplatesComponent),
  },
  {
    path: 'pdf-template/crear',
    loadComponent: () =>
      import('./pages/pdf-templates/components/template-edit/template-edit.component').then(m => m.TemplateEditComponent),
  },
  {
    path: 'pdf-template/editar/:id',
    loadComponent: () =>
      import('./pages/pdf-templates/components/template-edit/template-edit.component').then(m => m.TemplateEditComponent),
  },

  {
    path: '**',
    redirectTo: 'pdf-template',
  },
];
