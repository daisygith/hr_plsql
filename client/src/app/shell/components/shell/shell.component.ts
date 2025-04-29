import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    SidebarComponent
  ],

templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.scss",
})
// Shell component
export class ShellComponent {

}
