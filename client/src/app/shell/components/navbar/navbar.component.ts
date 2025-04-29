import { Component, inject, ViewEncapsulation } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputComponent,
    InputComponent,
    ReactiveFormsModule,
    TranslateModule,
    NgForOf,
    MatIcon,
    MatMiniFabButton,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  public translate: TranslateService = inject(TranslateService);
}
