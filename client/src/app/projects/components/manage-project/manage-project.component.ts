import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DashboardTaskComponent } from '../dashboard-task/dashboard-task.component';
import { ManageProjectIdComponent } from '../manage-project-id/manage-project-id.component';
import { ProjectDetails } from '../../models/projectDetails';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [
    MatIcon,
    MatTab,
    TranslateModule,
    MatTabGroup,
    MatTabLabel,
    DashboardTaskComponent,
    ManageProjectIdComponent,
  ],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageProjectComponent implements OnInit {
  id: number | undefined;
  projectDetails: ProjectDetails | undefined;
  readonly dialog = inject(MatDialog);

  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.getProjectById(this.id);
  }

  getProjectById(projectId: number | undefined): void {
    if (!projectId) {
      return;
    }
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.projectDetails = data;
    });
  }
}
