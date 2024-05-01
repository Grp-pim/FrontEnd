import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string ="http://localhost:3000/api/user";

  constructor(private http : HttpClient) { }

  signUp(user: any, image:File){
    let formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("role", user.role);
    formData.append("image", image);
    return this.http.post<{msg: any}>(this.userURL + "/signup", formData);
  }
  
  login(user: any){
    return this.http.post<{msg :any, token: string}>(this.userURL + "/login", user);
  }

  forgotPassword(email: string) {
    return this.http.post<{ msg: any }>(`${this.userURL}/forgotPassword`, { email: email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<{ msg: any }>(`${this.userURL}/resetPassword/${token}`, { password: newPassword });
  }

  getUserProfile(userId: string) {
    return this.http.get<{user: any}>(`${this.userURL}/getUserProfile/${userId}`);
  }

  updateUserProfile(userData: any) {
    return this.http.put<{isUpdated: boolean}>(`${this.userURL}/updateUserProfile`, userData);
  }

  deleteUserProfile(userId: string) {
    return this.http.delete<{msg: any}>(`${this.userURL}/deleteUserProfile/${userId}`);
  }

  updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.patch<{ msg: any }>(`${this.userURL}/updatePassword`, {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    }, { headers: headers });
  }

  // **************************************************************************************
  getStudents(){
    return this.http.get<{students : any}>(this.userURL + "/getByRoleStudents");
  }

  getTeachers(){
    return this.http.get<{teachers : any}>(this.userURL + "/getByRoleTeachers");
  }

  getUserById(userid: any): Observable<any> {
    return this.http.get(`${this.userURL}/api/user/getUserById/${userid}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

}