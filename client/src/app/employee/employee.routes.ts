import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/employee/employee.component').then(
        (m) => m.EmployeeComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
  },
  {
    path: ':employeeId',
    loadComponent: () =>
      import('./components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
  },
  {
    path: 'request-time-off',
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import(
            './components/request-time-off-application/request-time-off-application.component'
          ).then((m) => m.RequestTimeOffApplicationComponent),
      },
      {
        path: ':requestId',
        loadComponent: () =>
          import(
            './components/request-time-off-application/request-time-off-application.component'
          ).then((m) => m.RequestTimeOffApplicationComponent),
      },
    ],
  },
];
