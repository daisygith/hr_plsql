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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { RequestTimeOff } from '../../models/requestTimeOff';
import { ManageEmployee } from '../../models/manageEmmployee';
import { Role } from '../../../auth/models/role';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { AuthService } from '../../../auth/services/auth.service';
import { iif, of, switchMap } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-request-time-off-application',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCard,
    HasRoleDirective,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(MY_FORMATS),
    {
      provide: DateRange,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
  templateUrl: './request-time-off-application.component.html',
  styleUrl: './request-time-off-application.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffApplicationComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  requestById: RequestTimeOff | undefined;
  status: string | undefined;

  dataSource: ManageEmployee[] = [];

  public selectedDateRange: DateRange<Date | undefined> = inject(
    DateRange<Date>,
  );
  public canSaveRequestTimeOffRoles = [Role.USER];
  public canChangeStatusRequestTimeOff = [Role.ADMIN];

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _router = inject(Router);
  public notification: NotificationService = inject(NotificationService);
  private _authService = inject(AuthService);

  public requestTimeOffFormGroup!: FormGroup;

  ngOnInit() {
    this.id = this._activeRoute.snapshot.params['requestId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getEmployeeName();
    this.getRequestForEmployeeById(this.id);
  }

  public leaveType: string[] = [
    'ANNUAL_LEAVE',
    'CASUAL_LEAVE',
    'PAID_TIME_OFF',
    'SICK_LEAVE',
    'UNPAID_LEAVE',
  ];

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date,
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
    this.requestTimeOffFormGroup
      .get('startDate')
      ?.patchValue(this.selectedDateRange.start);
    this.requestTimeOffFormGroup
      .get('endDate')
      ?.patchValue(this.selectedDateRange.end);
  }

  public buildForm() {
    this.requestTimeOffFormGroup = this._fb.group({
      id: new FormControl(''),
      employeeId: new FormControl(''),
      leaveType: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: new FormControl(null),
      image: new FormControl(null),
    });

    if (!this._authService.hasRole([Role.USER]) && !this.isNew) {
      this.requestTimeOffFormGroup.disable();
      // this.requestTimeOffFormGroup.get('leaveType')?.disable();
    }
  }

  getEmployeeName(): void {
    this._employeeService.getManageEmployee().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
    });
  }

  getRequestForEmployeeById(requestId: number | undefined): void {
    if (!requestId) {
      return;
    }
    this._employeeService
      .getRequestForEmployeeById(requestId)
      .subscribe((data) => {
        this.requestById = {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        };
        this.selectedDateRange = new DateRange<Date | undefined>(
          this.requestById.startDate,
          this.requestById.endDate,
        );
        this.requestTimeOffFormGroup.patchValue(this.requestById);
      });
  }

  private _save(formData: any) {
    return iif(
      () => this.isNew,
      this._employeeService.addRequestForEmployee(formData),
      this._employeeService.updateRequestForEmployeeById(formData),
    );
  }

  draftData() {
    if (this.requestTimeOffFormGroup.invalid) {
      return;
    }
    this._save(this.requestTimeOffFormGroup.getRawValue()).subscribe({
      next: (data) => {
        this.requestTimeOffFormGroup.patchValue(data);
        this.notification.successMethod('ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK');
        if (this.isNew) {
          this._router.navigateByUrl(`/employee/request-time-off/${data.id}`);
        }
      },
      error: (err) => {
        this.notification.errorMethod(
          'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
        );
      },
    });
  }

  saveData() {
    if (this.requestTimeOffFormGroup.invalid) {
      return;
    }
    const formData = this.requestTimeOffFormGroup.getRawValue();
    iif(
      () => this.isNew,
      this._employeeService.addRequestForEmployee(formData),
      of(formData),
    )
      .pipe(
        switchMap((data) =>
          this._employeeService.setStatusPendingById(data?.id),
        ),
      )
      .subscribe({
        next: (value) => {
          this.requestTimeOffFormGroup.patchValue(value);
          this._router.navigateByUrl(`/employee`);
        },
      });
  }

  onApproveData(requestId: number | undefined): void {
    this._employeeService.setStatusApproveById(requestId).subscribe({
      next: (value) => {
        this.requestTimeOffFormGroup.patchValue(value);
      },
    });
  }

  onRejectData(requestId: number | undefined) {
    this._employeeService.setStatusRejectById(requestId).subscribe({
      next: (value) => {
        this.requestTimeOffFormGroup.patchValue(value);
      },
    });
  }
}
