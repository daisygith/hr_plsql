import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Role } from '../../../auth/models/role';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
import { DepartmentsList } from '../../../department/models/departmentsList';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { ProjectsList } from '../../models/projectsList';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    HasRoleDirective,
    TranslateModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatMiniFabButton,
    RouterLinkActive,
    RouterLink,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsListComponent implements OnInit {
  public canSeeDetailsEmployee = [Role.ADMIN];
  public notification: NotificationService = inject(NotificationService);

  private _projectService: ProjectService = inject(ProjectService);
  private _authService = inject(AuthService);
  private _router: Router = inject(Router);

  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<ProjectsList>([]);
  displayedColumns = ['name', 'actions'];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this._projectService.getProjects().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(projectId: number, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteProjectById(projectId);
      }
    });
  }

  deleteProjectById(projectId: number): void {
    this._projectService.deleteProject(projectId).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== projectId,
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
    this._router.navigate(['/projects', row.id]);
  }
}
