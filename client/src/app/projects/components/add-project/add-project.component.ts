import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { ProjectsList } from '../../models/projectsList';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    RouterLinkActive,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddProjectComponent implements OnInit {
  project: ProjectsList | undefined;

  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _router = inject(Router);

  public notification: NotificationService = inject(NotificationService);
  public addProjectGroup!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.addProjectGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
    });
  }

  saveData() {
    if (this.addProjectGroup.invalid) {
      return;
    }
    this._projectService
      .addProject(this.addProjectGroup.getRawValue())
      .subscribe({
        next: (data) => {
          this.addProjectGroup.patchValue(data);
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
          );
          this._router.navigateByUrl(`/projects`);
        },
        error: (err) => {
          this.notification.errorMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
          );
        },
      });
  }
}
