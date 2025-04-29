import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DepartmentService } from '../../services/department.service';
import { DepartmentsList } from '../../models/departmentsList';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddDepartmentComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  department: DepartmentsList | undefined;

  private _fb: FormBuilder = inject(FormBuilder);
  private _departmentService: DepartmentService = inject(DepartmentService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);
  public addDepartmentGroup!: FormGroup;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['departmentId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getDepartmentById(this.id);
  }

  public buildForm() {
    this.addDepartmentGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
    });
  }

  getDepartmentById(departmentId: number | undefined): void {
    if (!departmentId) {
      return;
    }
    this._departmentService
      .getDepartmentById(departmentId)
      .subscribe((data) => {
        this.department = data;
        this.addDepartmentGroup.patchValue(data);
      });
  }

  saveData() {
    if (this.addDepartmentGroup.invalid) {
      return;
    }
    if (this.isNew) {
      this._departmentService
        .addDepartment(this.addDepartmentGroup.getRawValue())
        .subscribe({
          next: (data) => {
            this.addDepartmentGroup.patchValue(data);
            this.notification.successMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
            );
          },
          error: (err) => {
            this.notification.errorMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
            );
          },
        });
    } else {
      this._departmentService
        .updateDepartment(this.addDepartmentGroup.getRawValue())
        .subscribe({
          next: (data) => {
            this.department = data;
            this.addDepartmentGroup.patchValue(data);
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
  }
}
