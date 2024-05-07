import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  forgotPwdForm! : FormGroup;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotPwdForm = this.formBuilder.group({
      email:["", Validators.required]
    })
  }

  forgot(){
    const email = this.forgotPwdForm.value.email;
    this.userService.forgotPassword(email).subscribe((response) => {
      console.log(response);
      if (response.msg === 'Password reset email sent') {
        this.router.navigate(['']);
        this.userService.Toast.fire({
          icon: 'success',
          title: 'Password reset email sent'
        });
      }
    }, 
    (error) => {
      console.error(error);
      this.forgotPwdForm = this.formBuilder.group({
        email:["", Validators.required]
      })
      this.userService.Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again later."
       });
    });
  }

}