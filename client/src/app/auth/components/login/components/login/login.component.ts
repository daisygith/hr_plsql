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
  FormsModule,
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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-login',
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
    RouterLink,
    RouterLinkActive,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    FormsModule,
    MatError,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);
  public router: Router = inject(Router);
  public notification: NotificationService = inject(NotificationService);

  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.loginForm = this._fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,40}$/,
        // ),
      ]),
    });
  }

  onLogin() {
    const userDetails = { ...this.loginForm.value };

    if (this.loginForm.valid) {
      this._authService.login(userDetails).subscribe((data) => {
        if (this._authService.isLoggedIn) {
          this.notification.successMethod('LOGIN.INFO.OK');
          this.router.navigate(['dashboard']);
        } else {
          this.notification.errorMethod('LOGIN.INFO.INVALID');
        }
      });
    }
  }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
