import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsList } from '../../models/projectsList';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { NotificationService } from '../../../shared/services/notification.service';
import { ProjectDetails } from '../../models/projectDetails';
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
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';

@Component({
  selector: 'app-manage-project-id',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    TranslateModule,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatMiniFabButton,
  ],
  templateUrl: './manage-project-id.component.html',
  styleUrl: './manage-project-id.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageProjectIdComponent implements OnInit {
  id: number | undefined;
  projectDetails: ProjectDetails | undefined;

  readonly dialog = inject(MatDialog);

  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);
  public addProjectGroup!: FormGroup;

  dataSource = new MatTableDataSource<ProjectsList>([]);
  displayedColumns = ['name', 'actions'];

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.buildForm();
    this.getProjectById(this.id);
  }

  getProjectById(projectId: number | undefined): void {
    if (!projectId) {
      return;
    }
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.projectDetails = data;
      this.dataSource.data = this.projectDetails.employees;
      this.addProjectGroup.patchValue(data);
    });
  }

  public buildForm() {
    this.addProjectGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      employees: new FormControl(null),
    });
  }

  saveData() {
    if (this.addProjectGroup.invalid) {
      return;
    }

    this._projectService
      .updateProject(this.addProjectGroup.getRawValue())
      .subscribe({
        next: (data) => {
          this.projectDetails = data;
          this.addProjectGroup.patchValue(data);
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
          );
        },
        error: (err) => {
          this.notification.errorMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
          );
        },
      });
  }

  openDialogEmployees() {
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      data: { projectId: this.id, employees: this.projectDetails?.employees },
      // height: '600px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openDialogDelete(
    employeeId: number | undefined,
    projectId: number | undefined,
    e: Event,
  ) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteEmployeeFromProject(projectId, employeeId);
      }
    });
  }

  deleteEmployeeFromProject(
    projectId: number | undefined,
    employeeId: number | undefined,
  ): void {
    this._projectService
      .deleteEmployeeFromProject(projectId, employeeId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== employeeId,
        );
        console.log(employeeId);
      });
  }
}
