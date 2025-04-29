import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: ` <div class="error-container">
    <h2>Access Denied</h2>
    <p>You do not have permission to access this resource.</p>
  </div>`,
})
export class UnauthorizedComponent {}
