import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService {
  private _refreshTasksSubject: Subject<void> = new Subject<void>();

  public refreshTasks$: Observable<void> =
    this._refreshTasksSubject.asObservable();

  public refreshTasks() {
    this._refreshTasksSubject.next();
  }
}
