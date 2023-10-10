import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http: HttpClient) { }

  public addstudent(data: any){
    try{
      return this._http.post('http://localhost:8080/student-service/AddStudent',data);
    }catch(error){
      console.log("Error featching student data", error);
      throw error;
    }
    
  }

  public updateStudent(id: number, data: any) {
    try {
      return this._http.put(`http://localhost:8080/student-service/updateStudentById/${id}`, data);
    } catch (error) {
      console.log("Error updating student data", error);
      throw error;
    }
  }
  
  

  public getAllStudents(){
    try{
      return this._http.get('http://localhost:8080/student-service/students');
    }catch(error){
      console.log("Error featching student data", error);
      throw error;
    }
    
  }

  public deleteStudent(id: number): Observable<any>{
    try{
      return this._http.delete(`http://localhost:8080/student-service/deleteStudentById/${id}`);
    }catch(error){
      console.log("Error deleting data", error);
      throw error;
    }
  }

}
