import { inject, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'imageToken',
  standalone: true,
})
export class ImageTokenPipe implements PipeTransform {
  private _authService: AuthService = inject(AuthService);

  transform(url: string): string | null {
    return url
      ? `${environment.apiUrl}${url}?token=${this._authService.token}`
      : null;
  }
}
