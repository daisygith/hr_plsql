import {Component, ViewEncapsulation} from "@angular/core";
import {MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [MatFormField, MatInput, MatIcon, TranslateModule],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {}
