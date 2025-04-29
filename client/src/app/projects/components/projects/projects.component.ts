import { Component, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsListComponent } from '../projects-list/projects-list.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    ProjectsListComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent {}
