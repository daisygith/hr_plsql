import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ChangePassword } from '../models/changePassword';
import { Profile } from '../models/profile';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}`;

  getUserProfile(): Observable<Profile> {
    return this._http.get<Profile>(`${this._apiUrl}/profiles/current`);
  }

  updateUser(profile: Profile): Observable<Profile> {
    console.log(profile);
    return this._http.put<Profile>(`${this._apiUrl}/profiles/edit`, profile);
  }

  changePassword(changePassword: ChangePassword): Observable<ChangePassword> {
    console.log(changePassword);
    return this._http.post<ChangePassword>(
      `${this._apiUrl}/users/changePassword`,
      changePassword,
    );
  }

  saveImageForUser(url: string): Observable<Profile> {
    return this._http.put<Profile>(`${this._apiUrl}/profiles/image`, {
      url: url,
    });
  }

  deleteImageForUser(): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/profiles/image`);
  }
}
