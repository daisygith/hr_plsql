import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MatError,
  MatFormField,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { passwordMismatchDirective } from '../../../../../shared/password-mismatch.directive';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    ReactiveFormsModule,
    TranslateModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatError,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);
  public router = inject(Router);
  public notification: NotificationService = inject(NotificationService);

  private _authService = inject(AuthService);
  private _fb: FormBuilder = inject(FormBuilder);

  public registrationForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.registrationForm = this._fb.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+[a-z]{2,}$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,40}$/,
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMismatchDirective,
      },
    );
  }

  onRegistration() {
    const userDetails = { ...this.registrationForm.value };

    delete userDetails.confirmPassword;

    if (this.registrationForm.valid) {
      this._authService.registration(userDetails).subscribe({
        next: (response) => {
          this.notification.successMethod('REGISTRATION.INFO.OK');
          console.log(response);
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.notification.errorMethod('REGISTRATION.INFO.INVALID');
          console.log(err);
        },
      });
    }
  }

  get username() {
    return this.registrationForm.controls['username'];
  }
  get email() {
    return this.registrationForm.controls['email'];
  }
  get password() {
    return this.registrationForm.controls['password'];
  }
  get confirmPassword() {
    return this.registrationForm.controls['confirmPassword'];
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideConfirm = signal(true);
  clickEventConfirm(event: MouseEvent) {
    this.hideConfirm.set(!this.hideConfirm());
    event.stopPropagation();
  }
}
