import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'app/services/user-service.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {

  id:any;
  user:any=[]

  username:any;
fullName: any;
email: any;
password: any;
phone: any;
role: any;

testing!:boolean
  constructor(private ActivatedRoute:ActivatedRoute, private us:UserServiceService) {
    this.id = this.ActivatedRoute.snapshot.params['id'];
   }

   getUser()
   {
    this.us.getUserbyId(this.id).subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.username = this.user.user.fullName;
      this.fullName = this.user.user.fullName;
      this.email = this.user.user.email;
      this.phone = this.user.user.phone;
      this.role = this.user.user.role;
      this.password = this.user.user.password;
    })
   }

   update(){
    let data:any={
      "_id":this.id,
      "fullName":this.fullName,
      "email":this.email,
      "phone":this.phone,
      "role":this.role,
      "password":this.password
    }
    this.us.updateUser(data).subscribe(res => {
      console.log(res);
      this.testing = true;
    })
   }

  ngOnInit(): void {
    this.getUser();
  }

}
