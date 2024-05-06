import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthServiceService } from '../../services/Oauth_google/auth-service.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required],
    });

  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("user connected", response.msg);
        if (response.token){
          sessionStorage.setItem("token", response.token);
          let role = this.decodeToken(response.token).role
          if (role == "Admin"){
            this.router.navigate(["dashboard/Admin"]);
            this.userService.Toast.fire({
              icon: 'success',
              title: 'Welcome Admin'
            });
          } else if (role == "Student"){
            this.router.navigate(["homeStepper"]);
            this.userService.Toast.fire({
              icon: 'success',
              title: 'Welcome Student'
            });
          } else if (role == "Teacher"){
            this.router.navigate(["test"]);
            this.userService.Toast.fire({
              icon: 'success',
              title: 'Welcome Teacher'
            });
          } else {
            this.router.navigate([""]);
          }
        } 
      },
      (error) => {
        console.error("Error login USER:", error);
        this.userService.Toast.fire({
          icon: "error",
          title: "Please check Email and Password"
        });
      }
    ); 
  }
  
  decodeToken(token: string) : any {
    return jwt_decode(token);
  }

  continueWithGoogle(){
    this.authService.redirectToGoogle();
  }

  continueWithGitHub(){
    
  }

}
