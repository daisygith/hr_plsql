import { Component, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DepartmentsListComponent } from '../departments-list/departments-list.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatTab,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    MatTabGroup,
    MatTabLabel,
    DepartmentsListComponent,
  ],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentsComponent {}
