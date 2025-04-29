import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../user/services/user.service';
import { Role } from '../../../auth/models/role';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatIcon,
    NgOptimizedImage,
    HasRoleDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private _authService = inject(AuthService);
  private _userService: UserService = inject(UserService);
  public router: Router = inject(Router);
  public notification: NotificationService = inject(NotificationService);

  public canUsersRoles = [Role.MODERATOR, Role.ADMIN];
  public canDepartmentsRoles = [Role.USER, Role.MODERATOR, Role.ADMIN];

  public imageUrl: string | undefined;
  public user = this._authService.user;

  ngOnInit(): void {
    this.getProfile();
  }

  onLogout() {
    this._authService.logout();
    this.router.navigate(['login']);
    this.notification.logOut('LOGIN.LOGOUT');
  }

  getProfile(): void {
    this._userService.getUserProfile().subscribe((data) => {
      this.imageUrl = data?.image
        ? `${environment.apiUrl}${data?.image}?token=${this._authService.token}`
        : undefined;
      console.log(this.imageUrl);
    });
  }
}
