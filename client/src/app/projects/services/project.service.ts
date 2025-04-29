import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProjectsList } from '../models/projectsList';
import { Task } from '../models/task';
import { ProjectDetails } from '../models/projectDetails';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/projects`;

  getProjects(): Observable<ProjectsList[]> {
    return this._http.get<ProjectsList[]>(`${this._apiUrl}`);
  }

  getProjectById(projectId: number | undefined): Observable<ProjectDetails> {
    return this._http.get<ProjectDetails>(`${this._apiUrl}/${projectId}`);
  }

  addProject(project: ProjectsList): Observable<ProjectsList> {
    return this._http.post<ProjectsList>(`${this._apiUrl}`, project);
  }

  updateProject(project: ProjectDetails): Observable<ProjectDetails> {
    return this._http.put<ProjectDetails>(
      `${this._apiUrl}/${project.id}`,
      project,
    );
  }

  deleteProject(projectId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${projectId}`);
  }

  //manage-project

  addEmployeesToProject(
    projectId: number,
    employeesIds: number[],
  ): Observable<ProjectsList> {
    return this._http.post<ProjectsList>(
      `${this._apiUrl}/${projectId}/employees`,
      { employeesIds },
    );
  }

  deleteEmployeeFromProject(
    projectId: number | undefined,
    employeesId: number | undefined,
  ): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/${projectId}/employees/${employeesId}`,
    );
  }

  //task
  getTasks(projectId: number | undefined): Observable<Task[]> {
    return this._http.get<Task[]>(`${this._apiUrl}/${projectId}/tasks`);
  }

  getTaskById(
    projectId: number | undefined,
    taskId: number | undefined,
  ): Observable<Task> {
    return this._http.get<Task>(`${this._apiUrl}/${projectId}/tasks/${taskId}`);
  }

  addTask(task: Task): Observable<Task> {
    return this._http.post<Task>(
      `${this._apiUrl}/${task.projectId}/tasks`,
      task,
    );
  }

  deleteTaskById(
    projectId: number | undefined,
    taskId: number,
  ): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/${projectId}/tasks/${taskId}`,
    );
  }

  updateTaskById(task: Task): Observable<Task> {
    return this._http.put<Task>(
      `${this._apiUrl}/${task.projectId}/tasks/${task.id}`,
      task,
    );
  }
}
