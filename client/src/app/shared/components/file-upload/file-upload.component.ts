import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UploadResponse } from '../../models/upload-response';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent implements OnInit {
  @Output()
  onUploadSuccess: EventEmitter<string> = new EventEmitter<string>();
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;

  private _http: HttpClient = inject(HttpClient);

  ngOnInit(): void {}

  //on file select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
      this.onUpload();
    }
  }

  private onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);

      // https://httpbin.org/post
      const upload$ = this._http.post<UploadResponse>(
        `${environment.apiUrl}/uploads/images`,
        formData,
      );

      this.status = 'uploading';

      upload$.subscribe({
        next: (response: UploadResponse) => {
          this.status = 'success';
          this.onUploadSuccess.emit(response.url);
        },
        error: (err) => {
          this.status = 'fail';
          return throwError(() => err);
        },
      });
    }
  }
}
