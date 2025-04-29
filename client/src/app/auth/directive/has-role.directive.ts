import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole!: Role[];
  private isVisible = false;

  private _authService = inject(AuthService);

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
  ) {}

  ngOnInit() {
    if (this._authService.hasRole(this.hasRole)) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }
}
