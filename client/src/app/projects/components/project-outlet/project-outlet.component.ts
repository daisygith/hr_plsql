import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-outlet',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './project-outlet.component.html',
  styleUrl: './project-outlet.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectOutletComponent {}
