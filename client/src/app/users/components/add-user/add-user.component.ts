import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { UsersService } from '../../services/users.service';
import { Role } from '../../model/role';
import { UserList } from '../../model/user-list';
import { ManageEmployee } from '../../../employee/models/manageEmmployee';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatLabel,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: 'add-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;

  public notification: NotificationService = inject(NotificationService);

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _usersService = inject(UsersService);

  public addUserForm!: FormGroup;
  public employees: ManageEmployee[] = [];
  filteredOptions: Observable<ManageEmployee[]> | undefined;

  ngOnInit(): void {
    this.employees = this._activeRoute.snapshot.data['employees'];
    this.id = this._activeRoute.snapshot.params['userId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getUserById(this.id);
  }

  public roles: Role[] = [
    { id: 1, name: 'ROLE_USER' },
    { id: 2, name: 'ROLE_MODERATOR' },
    { id: 3, name: 'ROLE_ADMIN' },
  ];

  public buildForm() {
    this.addUserForm = this._fb.group({
      id: new FormControl(null),
      email: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      roles: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null),
    });

    this.filteredOptions = this.addUserForm
      .get('employeeId')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.employees.slice();
        }),
      );
  }

  getUserById(userId: number | undefined): void {
    if (!userId) {
      return;
    }
    this._usersService.getUserById(userId).subscribe((data) => {
      this._patchForm(data);
      console.log(data);
    });
  }

  saveData() {
    if (this.addUserForm.valid) {
      const formData = this.addUserForm.getRawValue();
      const payloadUser: UserList = {
        ...formData,
        roles: formData.roles.map((role: number) =>
          this.roles.find((item) => item.id === role),
        ),
      };
      if (this.isNew) {
        this._usersService.createUser(payloadUser).subscribe({
          next: (value) => {
            this._patchForm(value);
            // todo: dodac info ze utworzono lub nie utworzono użytkownika
            this.notification.successMethod('ok');
          },
          error: (err) => {
            this.notification.errorMethod('err');
          },
        });
      } else {
        this._usersService.updateUser(payloadUser).subscribe({
          next: (value) => {
            this._patchForm(value);
            // todo: dodac info ze utworzono lub nie utworzono użytkownika

            this.notification.successMethod('ok');
          },
          error: (err) => {
            this.notification.errorMethod('not ok');
          },
        });
      }
    }
  }

  displayFn = (employeeId: number): string => {
    const employee = this.employees?.find((e) => e.id === employeeId);
    return employee && employee.name ? employee.name : '';
  };
  private _filter(name: string): ManageEmployee[] {
    const filterValue = name.toLowerCase();

    return this.employees?.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }

  private _patchForm(data: UserList) {
    this.addUserForm.patchValue({
      ...data,
      roles: data.roles?.map((role) => role.id),
    });
  }
}
