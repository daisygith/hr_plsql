import { inject, Injectable } from '@angular/core';
import { RequestTimeOff } from '../models/requestTimeOff';
import { ManageEmployee } from '../models/manageEmmployee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { environment } from '../../../environments/environment';
import { RegisterRequestTimeOff } from '../models/registerRequestTimeOff';
import { SaveImageRequest } from '../../shared/models/save-image-request';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/employees`;

  //add-employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>(`${this._apiUrl}`, employee);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this._http.get<Employee>(`${this._apiUrl}/${employeeId}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this._http.put<Employee>(`${this._apiUrl}/${employee.id}`, employee);
  }

  //manage-employee
  getManageEmployee(): Observable<ManageEmployee[]> {
    return this._http.get<ManageEmployee[]>(`${this._apiUrl}`);
  }

  deleteManageEmployeeById(employeeId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${employeeId}`);
  }

  //request-time-off
  addRequestForEmployee(
    employee: RegisterRequestTimeOff,
  ): Observable<RequestTimeOff> {
    return this._http.post<RequestTimeOff>(
      `${this._apiUrl}/request-time-off`,
      employee,
    );
  }

  getRequestForEmployee(): Observable<RequestTimeOff[]> {
    return this._http.get<RequestTimeOff[]>(`${this._apiUrl}/request-time-off`);
  }

  getRequestForEmployeeById(employeeId: number): Observable<RequestTimeOff> {
    return this._http.get<RequestTimeOff>(
      `${this._apiUrl}/request-time-off/${employeeId}`,
    );
  }

  updateRequestForEmployeeById(
    employee: RequestTimeOff,
  ): Observable<RequestTimeOff> {
    return this._http.put<RequestTimeOff>(
      `${this._apiUrl}/request-time-off/${employee.id}`,
      employee,
    );
  }

  deleteRequestForEmployeeById(employeeId: number): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/request-time-off/${employeeId}`,
    );
  }

  //image
  saveImageForEmployee(
    url: string,
    employeeId: number | undefined,
  ): Observable<SaveImageRequest> {
    return this._http.put<SaveImageRequest>(
      `${this._apiUrl}/${employeeId}/image`,
      { url: url },
    );
  }

  deleteImageForEmployee(employeeId: number | undefined): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${employeeId}/image`);
  }

  setStatusApproveById(
    requestId: number | undefined,
  ): Observable<RequestTimeOff> {
    return this._http.put<RequestTimeOff>(
      `${this._apiUrl}/request-time-off/${requestId}/approve`,
      null,
    );
  }

  setStatusRejectById(
    requestId: number | undefined,
  ): Observable<RequestTimeOff> {
    return this._http.put<RequestTimeOff>(
      `${this._apiUrl}/request-time-off/${requestId}/reject`,
      null,
    );
  }

  setStatusPendingById(
    requestId: number | undefined,
  ): Observable<RequestTimeOff> {
    return this._http.put<RequestTimeOff>(
      `${this._apiUrl}/request-time-off/${requestId}/pending`,
      null,
    );
  }
}
