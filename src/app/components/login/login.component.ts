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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required],
    });

  }

  login(){
    this.userService.login(this.loginForm.value).subscribe((response)=>{
      console.log("user connected", response);
      if (response.token){
        sessionStorage.setItem("token", response.token);
        let role = this.decodeToken(response.token).role
        if (role == "Admin"){
          this.router.navigate(["dashboard-Admin"]);
        }else if (role == "Student"){
          this.router.navigate(["homeStepper"]);
        }else if (role == "Teacher"){
          this.router.navigate(["test"]);
        }else{
          this.router.navigate([""]);
        }
      } else {
        this.errorMsg = "Please check Email && Password"
      }
    }) 
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
