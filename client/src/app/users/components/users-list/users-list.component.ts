import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.service';
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
import { UserList } from '../../model/user-list';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { NotificationService } from '../../../shared/services/notification.service';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    ImageTokenPipe,
    MatFormField,
    MatIcon,
    TranslateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    RouterLink,
    MatInput,
    NgOptimizedImage,
    MatMiniFabButton,
    RouterLinkActive,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  public notification: NotificationService = inject(NotificationService);
  private _usersServices: UsersService = inject(UsersService);
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<UserList>([]);
  displayedColumns = ['username', 'email', 'roles', 'actions'];

  ngOnInit(): void {
    this.getManageUsers();
  }

  getManageUsers(): void {
    this._usersServices.findAllUsers().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }

  openDialog(userId: UserList, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteUserById(userId);
      }
    });
  }

  deleteUserById(userId: UserList): void {
    this._usersServices.deleteUserById(userId.id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item !== userId,
        );
        this.notification.successMethod('DATA.REMOVE_OK');
      },
      (error) => {
        console.log(error);
      },
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
