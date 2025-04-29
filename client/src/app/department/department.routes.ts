import { Routes } from '@angular/router';

export const departmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/departments/departments.component').then(
        (m) => m.DepartmentsComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-department/add-department.component').then(
        (m) => m.AddDepartmentComponent,
      ),
  },
  {
    path: ':departmentId',
    loadComponent: () =>
      import('./components/add-department/add-department.component').then(
        (m) => m.AddDepartmentComponent,
      ),
  },
];
