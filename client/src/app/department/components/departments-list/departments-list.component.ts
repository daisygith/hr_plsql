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
import { DepartmentsList } from '../../models/departmentsList';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatInput } from '@angular/material/input';
import { DepartmentService } from '../../services/department.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Role } from '../../../auth/models/role';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { MatMiniFabButton } from '@angular/material/button';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFormField,
    MatIcon,
    TranslateModule,
    MatTable,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatInput,
    HasRoleDirective,
    MatMiniFabButton,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './departments-list.component.html',
  styleUrl: './departments-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentsListComponent implements OnInit {
  public canSeeDetailsEmployee = [Role.ADMIN];
  public notification: NotificationService = inject(NotificationService);

  private _departmentService: DepartmentService = inject(DepartmentService);
  private _authService = inject(AuthService);
  private _router: Router = inject(Router);

  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<DepartmentsList>([]);
  displayedColumns = ['name', 'actions'];

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this._departmentService.getDepartments().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(departmentId: DepartmentsList, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteDepartmentById(departmentId);
      }
    });
  }

  deleteDepartmentById(departmentId: DepartmentsList): void {
    this._departmentService.deleteDepartment(departmentId.id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item !== departmentId,
        );
        this.notification.successMethod('DATA.REMOVE_OK');
      },
      (error) => {
        console.log(error);
      },
    );
  }

  onRowCLick(row: DepartmentsList) {
    if (!this._authService.hasRole(this.canSeeDetailsEmployee)) {
      return;
    }
    this._router.navigate(['/departments', row.id]);
  }
}
