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
    if (this.forgotPwdForm.invalid) {
      this.errorMsg = "Please enter a valid email.";
      return;
    }
    const email = this.forgotPwdForm.value.email;
    this.userService.forgotPassword(email).subscribe((response) => {
      console.log(response);
      if (response.msg === 'Password reset email sent') {
        this.router.navigate(['/login']);
      } else {
        this.errorMsg = 'Something went wrong. Please try again later.';
      }
    }, (error) => {
      console.error(error);
      this.errorMsg = 'Something went wrong. Please try again later.';
    });
  }

}