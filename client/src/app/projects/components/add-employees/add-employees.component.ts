import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeeService } from '../../../employee/services/employee.service';
import { ManageEmployee } from '../../../employee/models/manageEmmployee';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../services/project.service';
import { ProjectManagementService } from '../../services/project-management.service';
import { map } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-employees',
  standalone: true,
  imports: [
    MatDialogTitle,
    TranslateModule,
    MatButton,
    MatDialogClose,
    MatTable,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatDialogActions,
    MatIcon,
    MatPaginator,
    MatDialogContent,
    MatFormField,
    MatInput,
  ],
  templateUrl: './add-employees.component.html',
  styleUrl: './add-employees.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeesComponent implements OnInit, AfterViewInit {
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _projectService: ProjectService = inject(ProjectService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _projectManagementService: ProjectManagementService = inject(
    ProjectManagementService,
  );
  dataSource = new MatTableDataSource<ManageEmployee>([]);
  displayedColumns = ['select', 'name'];
  selection = new SelectionModel<ManageEmployee>(true, []);

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getManageEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: number; employees: ManageEmployee[] },
  ) {}

  readonly dialogRef = inject(MatDialogRef<AddEmployeesComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }

  getManageEmployee(): void {
    const ar = this.data.employees;
    console.log(ar);
    this._employeeService
      .getManageEmployee()
      .pipe(
        map((employees: ManageEmployee[]) => {
          return employees.filter((item) => {
            return ar.every((f) => {
              return f.id !== item.id;
            });
          });
        }),
      )
      .subscribe((em) => {
        this.dataSource.data = em;
        console.log(em);
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ManageEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveData() {
    const employeeIds = this.selection.selected.map((employee) => employee.id);
    this._projectService
      .addEmployeesToProject(this.data.projectId, employeeIds)
      .subscribe({
        next: (data) => {
          this.dialogRef.close(data);
          this._projectManagementService.refreshTasks();
        },
      });
  }
}
