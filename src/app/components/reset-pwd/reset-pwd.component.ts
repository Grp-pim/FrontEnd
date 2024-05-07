import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  resetPwdForm!: FormGroup;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetPwdForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  reset() {
    // if (this.resetPwdForm.invalid) {
    //   this.errorMsg = "Please enter a valid password (6-12 characters)";
    //   return;
    // }
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      console.error('No token found in URL');
      this.router.navigate(['error']);
      return;
    }
    const newPassword = this.resetPwdForm.value.password;
    this.userService.resetPassword(token, newPassword).subscribe(
      (response) => {
        console.log(response);
        if (response.msg === 'Password reset successful') {
          this.router.navigate(['login']);
          this.userService.Toast.fire({
            icon: 'success',
            title: 'Password reset successful'
          });
        } else {
          this.errorMsg = 'Something went wrong. Please try again later.';
        }
      },
      (error) => {
        console.error(error);
        // reload form
        this.resetPwdForm = this.formBuilder.group({
          password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
        });
        this.userService.Toast.fire({
          icon: "error",
          title: "Something went wrong. Please try again later."
         });
      }
    );
  }

}
