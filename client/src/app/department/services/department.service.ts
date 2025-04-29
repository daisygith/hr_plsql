import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DepartmentsList } from '../models/departmentsList';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/departments`;

  getDepartments(): Observable<DepartmentsList[]> {
    return this._http.get<DepartmentsList[]>(`${this._apiUrl}`);
  }

  addDepartment(department: DepartmentsList): Observable<DepartmentsList> {
    return this._http.post<DepartmentsList>(`${this._apiUrl}`, department);
  }

  getDepartmentById(departmentId: number): Observable<DepartmentsList> {
    return this._http.get<DepartmentsList>(`${this._apiUrl}/${departmentId}`);
  }

  updateDepartment(department: DepartmentsList): Observable<DepartmentsList> {
    return this._http.put<DepartmentsList>(
      `${this._apiUrl}/${department.id}`,
      department,
    );
  }

  deleteDepartment(departmentId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${departmentId}`);
  }
}
