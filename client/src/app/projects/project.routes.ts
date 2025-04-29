import { Routes } from '@angular/router';
import { ProjectOutletComponent } from './components/project-outlet/project-outlet.component';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-project/add-project.component').then(
        (m) => m.AddProjectComponent,
      ),
  },
  {
    path: ':projectId',
    component: ProjectOutletComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/manage-project/manage-project.component').then(
            (m) => m.ManageProjectComponent,
          ),
      },
      {
        path: 'tasks/new',
        loadComponent: () =>
          import('./components/add-task/add-task.component').then(
            (m) => m.AddTaskComponent,
          ),
      },
      {
        path: 'tasks/:taskId',
        loadComponent: () =>
          import('./components/add-task/add-task.component').then(
            (m) => m.AddTaskComponent,
          ),
      },
    ],
  },
];
