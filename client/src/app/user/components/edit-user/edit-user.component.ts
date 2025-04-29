import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { Profile } from '../../models/profile';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    TranslateModule,
    ReactiveFormsModule,
    NgForOf,
    ChangePasswordComponent,
    FileUploadComponent,
    ImageTokenPipe,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditUserComponent implements OnInit {
  profile: Profile | undefined;

  public translate: TranslateService = inject(TranslateService);
  public notification: NotificationService = inject(NotificationService);

  private _fb: FormBuilder = inject(FormBuilder);
  private _userService: UserService = inject(UserService);

  public editUserForm!: FormGroup;

  public get imageUrl() {
    return this.editUserForm?.get('image')?.value;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getProfile();
  }

  public genderOption: string[] = ['MALE', 'FEMALE', 'OTHER'];

  public destinationOption: string[] = ['OPTION_1', 'OPTION_2'];

  public buildForm() {
    this.editUserForm = this._fb.group({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      staffId: new FormControl({ disabled: true, value: '' }, []),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    });
  }

  getProfile(): void {
    this._userService.getUserProfile().subscribe((data) => {
      this.profile = data;
      this.editUserForm.patchValue(data);
    });
  }

  saveData() {
    if (this.editUserForm.invalid) {
      return;
    }

    this._userService.updateUser(this.editUserForm.getRawValue()).subscribe({
      next: (data) => {
        this.notification.successMethod('USER.INFO.OK');
      },
      error: (err) => {
        this.notification.errorMethod('USER.INFO.INVALID');
      },
    });
  }

  public onUploadImage(url: string) {
    this._userService.saveImageForUser(url).subscribe((data) => {
      this.editUserForm.patchValue(data);
    });
  }

  onDeleteImage() {
    this._userService.deleteImageForUser().subscribe(
      () => {
        this.notification.successMethod('DATA.REMOVE_OK');
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
