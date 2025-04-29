import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit-user/edit-user.component').then(
        (m) => m.EditUserComponent,
      ),
  },
];
