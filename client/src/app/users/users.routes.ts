import { Routes } from '@angular/router';
import { employeesResolver } from './services/employees.resolver';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/users-management/users-management.component').then(
        (m) => m.UsersManagementComponent,
      ),
  },
  {
    path: 'new',
    resolve: { employees: employeesResolver },
    loadComponent: () =>
      import('./components/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
  {
    path: ':userId',
    resolve: { employees: employeesResolver },
    loadComponent: () =>
      import('./components/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
];
