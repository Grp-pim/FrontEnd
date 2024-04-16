import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  userForm! : FormGroup;
  id : any;
  findedUser : any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      fullName:["", [Validators.required, Validators.minLength(3)]],
      phone:["", [Validators.required, Validators.pattern('[0-9]{8}')]],
    });

    this.getProfileInformations();
  }

  getProfileInformations(){
    const token = sessionStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    this.id = decodedToken._id;
    this.userService.getUserProfile(this.id).subscribe((data)=>{
      console.log("here user from BE", data.user);
      this.findedUser = data.user;  
      this.userForm.patchValue({
        email: this.findedUser.email,
        fullName: this.findedUser.fullName,
        phone: this.findedUser.phone,
      })
    });
  }

  editProfile() {
    let obj=this.userForm.value;
    const token = sessionStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    obj._id = decodedToken._id;
    this.userService.updateUserProfile(obj).subscribe((response)=>{
      console.log("here res from BE", response.isUpdated); 
    })
  }

  decodeToken(token: string) : any {
    return jwt_decode(token);
  };

}
