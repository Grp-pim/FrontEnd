import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/Oauth_google/auth-service.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm! : FormGroup;
  imagePreview : any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.signupForm = this.formBuilder.group({
      fullName:["", [Validators.required, Validators.minLength(3)]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      phone:["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      image:[""],
      role: [""]
    });
  }

  // signup(){
  //   this.userService.signUp(this.signupForm.value, this.signupForm.value.image).subscribe((response) => {
  //     console.log("here response from BE", response.msg);
  //     // Afficher le toast après un ajout réussi
  //     this.router.navigate(["login"]);
  //     this.userService.Toast.fire({
  //       icon: 'success',
  //       title: 'Account created with success'
  //     });
  //   },
  //   (error) => {
  //     console.error("Error adding USER:", error);
  //     this.userService.Toast.fire({
  //      icon: "error",
  //      title: "An error was occured while create account"
  //     });
  //   }
  //   );
  // }


  signup(){
    // condition teacher
    if(this.signupForm.value.role === "Teacher"){
      this.signupForm.value.status="AWAITING";
    }

    this.userService.signUp(this.signupForm.value, this.signupForm.value.image).subscribe((response) => {
      console.log("here response from BE", response.msg);
      if (this.signupForm.value.role === "Teacher") {
        this.router.navigate([""]);
        this.userService.Toast.fire({
          icon: 'info',
          title: 'Account created with success, wait the acceptation of Admin '
        });    
      } else {
      this.router.navigate(["login"]);
      this.userService.Toast.fire({
        icon: 'success',
        title: 'Account created with success'
      });
      }
    },
    (error) => {
      console.error("Error adding USER:", error);
      this.form();
      this.userService.Toast.fire({
       icon: "error",
       title: "An error was occured while create account"
      });
    }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.signupForm.patchValue({ image: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  continueWithGoogle(): void {
    this.authService.redirectToGoogle()
  }
  
  continueWithGitHub(){
    this.authService.redirectToGitHub();
  }

  
}
