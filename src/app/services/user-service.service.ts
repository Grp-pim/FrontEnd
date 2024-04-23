import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get(`${environment.apiUrl}/user/getAllUsers`);
  }
  deleteUser(id:any){
    return this.http.delete(`${environment.apiUrl}/user/deleteUserProfile/`+id);
  }

  getUserbyId(id:any){
    return this.http.get(`${environment.apiUrl}/user/getUserProfile/`+id);
  }

  updateUser(user:any){
    return this.http.put(`${environment.apiUrl}/user/updateUserProfile`,user);
  }
}
