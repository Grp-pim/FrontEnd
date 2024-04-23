import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestingService {

  constructor(private http: HttpClient) { }

  addTest(test: any) {
    return this.http.post(`${environment.apiUrl}/test/`, test)
  }
  getAllTests() {
    return this.http.get(`${environment.apiUrl}/test/`);
  }

  deleteTest(id: any) {
    return this.http.delete(`${environment.apiUrl}/test/` + id);
  } 
  deleteAll(){
    return this.http.delete(`${environment.apiUrl}/test/`);
  }
  getById(id:any){
    return this.http.get(`${environment.apiUrl}/test/` + id);

  }
  updateTest(id:any,test:any){
    return this.http.put(`${environment.apiUrl}/test/`+id,test)
  }



  /////__________/////

  addTask(body:any){
    
    return this.http.post(`${environment.apiUrl}/test/taskApi`, body)

  }

  deleteTask(id: any, idtask: any) {
    return this.http.delete(`${environment.apiUrl}/test/taskApi/` + id + "/" + idtask);
  }

}
