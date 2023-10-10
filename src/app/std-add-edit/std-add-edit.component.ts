import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators if needed
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-std-add-edit',
  templateUrl: './std-add-edit.component.html',
  styleUrls: ['./std-add-edit.component.css']
})
export class StdAddEditComponent implements OnInit {

  stdForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    private _stdService: StudentService, 
    private _dialogref: MatDialogRef<StdAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
     ){
    this.stdForm = this._fb.group({
      name: [''],
      age: [''], 
      address: [''],
      contactNo: [''] 
    });
  }

  ngOnInit(): void {
    this.stdForm.patchValue(this.data);
    console.log(this.data);
  }

  onFormSubmit() {

    if (this.stdForm.valid) {
      if (this.data) {
        this._stdService.updateStudent(this.data.id,this.stdForm.value).subscribe(
          (val: any) => {
            alert('Student Updated.');
            
            this._dialogref.close(true);
            window.location.reload();
            
          },
          (err: any) => {
            console.error(err);
          }
        );
      } else {
        this._stdService.addstudent(this.stdForm.value).subscribe(
          (val: any) => {
            alert('Student added successfully.');
            this._dialogref.close(true);
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    }
  }
  

}
