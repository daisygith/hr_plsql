import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../../services/employee.service';
import { RequestTimeOff } from '../../models/requestTimeOff';
import {
  DatePipe,
  LowerCasePipe,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { Role } from '../../../auth/models/role';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { MatChip } from '@angular/material/chips';
import { AuthService } from '../../../auth/services/auth.service';
import { ManageEmployee } from '../../models/manageEmmployee';
import { ApplyPurePipe } from '../../../shared/pipes/apply-pure.pipe';

@Component({
  selector: 'app-request-time-off',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    TranslateModule,
    DatePipe,
    RouterLinkActive,
    RouterLink,
    MatMiniFabButton,
    NgIf,
    MatFormField,
    MatInput,
    ImageTokenPipe,
    NgOptimizedImage,
    HasRoleDirective,
    LowerCasePipe,
    MatChip,
    ApplyPurePipe,
  ],
  templateUrl: './request-time-off.component.html',
  styleUrl: './request-time-off.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffComponent implements OnInit {
  public canChangeStatusRequest = [Role.ADMIN];
  public canEditByUserStatusRequest = [Role.USER];
  public notification: NotificationService = inject(NotificationService);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _authService = inject(AuthService);
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<RequestTimeOff>([]);

  displayedColumns = [
    'employeeName',
    'leaveType',
    'startDate',
    'endDate',
    'days',
    'status',
    // 'statusEmployee',
    'actions',
  ];

  ngOnInit(): void {
    this.getRequestForEmployee();
  }

  getRequestForEmployee(): void {
    this._employeeService.getRequestForEmployee().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }

  openDialog(row: RequestTimeOff, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteRequestForEmployeeById(row);
      }
    });
  }

  deleteRequestForEmployeeById(requestTimeOff: RequestTimeOff): void {
    this._employeeService
      .deleteRequestForEmployeeById(requestTimeOff.id)
      .subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(
            (data) => data !== requestTimeOff,
          );
          this.notification.successMethod('DATA.REMOVE_OK');
        },
        (error) => {
          console.log(error);
        },
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onApprove(event: any, row: RequestTimeOff) {
    if (event) {
      event.stopPropagation();
    }
    this._employeeService.setStatusApproveById(row.id).subscribe({
      next: (newRow) => {
        const newData = this.dataSource.data.map((item) =>
          item.id === newRow.id ? newRow : item,
        );
        console.log(newData);
        this.dataSource.data = newData;
      },
    });
  }

  onReject(event: any, row: RequestTimeOff) {
    if (event) {
      event.stopPropagation();
    }
    this._employeeService.setStatusRejectById(row.id).subscribe({
      next: (newRow) => {
        const newData = this.dataSource.data.map((item) =>
          item.id === newRow.id ? newRow : item,
        );
        console.log(newData);
        this.dataSource.data = newData;
      },
    });
  }

  canUserDeleteRequest = (employee: ManageEmployee): boolean => {
    return (
      // this._authService.hasRole(this.canEditByUserStatusRequest) ||
      employee.id === this._authService.user?.employeeId
    );
  };
}
