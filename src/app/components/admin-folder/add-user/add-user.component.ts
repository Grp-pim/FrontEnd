import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  signupForm! : FormGroup;
  imagePreview : any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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

  signup(){
    this.userService.signUp(this.signupForm.value, this.signupForm.value.image).subscribe((response) => {
      console.log("here response from BE", response.msg);
      // reload form
      this.form();
      // Afficher le toast après un ajout réussi
      this.userService.Toast.fire({
        icon: 'success',
        title: 'Account created with success'
      });
    },
    (error) => {
      console.error("Error adding USER:", error);
      // reload form
      this.form();
      // Afficher le toast error
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

}