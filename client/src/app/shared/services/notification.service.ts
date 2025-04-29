import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _translate: TranslateService = inject(TranslateService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  public successMethod(messageKey: string) {
    this._snackBar.open(this._translate.instant(messageKey), 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar'],
    });
  }

  public errorMethod(messageKey: string) {
    this._snackBar.open(this._translate.instant(messageKey), 'X', {
      duration: 3000,
      panelClass: ['red-snackbar'],
    });
  }

  public logOut(messageKey: string) {
    this._snackBar.open(this._translate.instant(messageKey), 'OK', {
      duration: 3000,
      panelClass: ['green-snackbar'],
    });
  }
}
