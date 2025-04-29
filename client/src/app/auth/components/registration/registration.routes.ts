import { Routes } from '@angular/router';

export const routesRegistration: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
  },
];
