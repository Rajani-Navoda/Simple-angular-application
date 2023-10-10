import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StdAddEditComponent } from './std-add-edit/std-add-edit.component';
import { StudentService } from './services/student.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'contactNo', 'action'];
  dataSource!: MatTableDataSource<AnyCatcher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private _dialog: MatDialog, private _stdService: StudentService){}
  
  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStdForm() {
    const dialogRef = this._dialog.open(StdAddEditComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getStudentList();
      }
    });
  }
  

  getStudentList() {
    this._stdService.getAllStudents().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('API response is not an array:', res);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number){
    this._stdService.deleteStudent(id).subscribe({
      next:(res) =>{
        alert('Student deleted.');
        this.getStudentList();
      },
      error:console.log,
    })
  }

  openEditForm(data: any) {
   
    const dialogRef = this._dialog.open(StdAddEditComponent,{data,});
    
  }

}
