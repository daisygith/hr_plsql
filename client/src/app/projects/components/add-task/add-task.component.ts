import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsList } from '../../models/projectsList';
import { Task } from '../../models/task';
import { ProjectManagementService } from '../../services/project-management.service';
import { ProjectDetails } from '../../models/projectDetails';
import { ManageEmployee } from '../../../employee/models/manageEmmployee';
import { iif, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatButton,
    TranslateModule,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnInit {
  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _router = inject(Router);
  private _projectManagementService: ProjectManagementService = inject(
    ProjectManagementService,
  );
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);

  public addTaskGroup!: FormGroup;

  isNew: boolean = false;
  isEdit: boolean = false;

  id!: number | undefined;
  taskId: number | undefined;

  task: Task | undefined;
  project: ProjectsList | undefined;
  projectDetails!: ProjectDetails | undefined;

  ngOnInit(): void {
    this.id = this._activeRoute.parent?.snapshot.params['projectId'];
    this.taskId = this._activeRoute.snapshot.params['taskId'];
    this.isNew = !this.taskId;
    this.buildForm();
    this.getProjectById(this.id);

    if (this.id && this.taskId) {
      this.getTaskById(this.id, this.taskId);
    }
    console.log(this.id);
  }

  public employeeArr: ManageEmployee[] | undefined = [];

  public statusOption: string[] = ['NEW', 'WORK_IN_PROGRESS', 'DONE'];

  public priorityOption: string[] = ['NORMAL', 'HIGH', 'LOW'];

  public typeTaskOption: string[] = ['NORMAL', 'FAULT'];

  getProjectById(projectId: number | undefined): void {
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.projectDetails = data;
      this.employeeArr = this.projectDetails.employees;
    });
  }

  public buildForm() {
    this.addTaskGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, []),
      description: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null),
      projectId: new FormControl(this.id),
      estimatedWorkTime: new FormControl(null, [Validators.required]),
      estimatedTaskTimeEnd: new FormControl(null, [Validators.required]),
      startDate: new Date(),
      priorityStatus: new FormControl(null, [Validators.required]),
      typeTask: new FormControl(null, [Validators.required]),
      comment: new FormControl(null),
    });
    if (!this.isNew) {
      this.addTaskGroup.get('status')?.addValidators([Validators.required]);
      this.addTaskGroup.disable();
    }
  }

  getTaskById(projectId: number, taskId: number | undefined) {
    this._projectService.getTaskById(projectId, taskId).subscribe((el) => {
      this.task = el;
      this.addTaskGroup.patchValue(el);
    });
  }

  public toggleEdit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.addTaskGroup.enable();
    } else {
      this.addTaskGroup.disable();
    }
  }

  saveData() {
    if (this.addTaskGroup.invalid) {
      return;
    }
    const formData = this.addTaskGroup.getRawValue();
    if (this.isNew) {
      iif(
        () => this.isNew,
        this._projectService.addTask(formData),
        of(formData),
      )
        .pipe(
          switchMap((data) =>
            this._projectService.getTaskById(this.id, data?.id),
          ),
        )
        .subscribe({
          next: (value) => {
            this.addTaskGroup.patchValue(value);
          },
        });
    } else {
      this._projectService
        .updateTaskById(this.addTaskGroup.getRawValue())
        .subscribe({
          next: (data) => {
            // this.dialogRef.close();
            this.task = data;
            this.addTaskGroup.patchValue(data);
            this.notification.successMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
            );
            this._projectManagementService.refreshTasks();
            this._router.navigateByUrl(`/projects/${this.id}`);
          },
          error: (err) => {
            this.notification.errorMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
            );
          },
        });
    }
    this._projectManagementService.refreshTasks();
    this._router.navigateByUrl(`/projects/${this.id}`);
  }
}
