import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../employee/services/employee.service';
import { inject } from '@angular/core';
import { ManageEmployee } from '../../employee/models/manageEmmployee';

export const employeesResolver: ResolveFn<ManageEmployee[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<ManageEmployee[]> => {
  const employeeService = inject(EmployeeService);
  return employeeService.getManageEmployee();
};
