import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-table-admin',
  templateUrl: './users-table-admin.component.html',
  styleUrls: ['./users-table-admin.component.css']
})
export class UsersTableAdminComponent implements OnInit {

  studentsTab :any =[];
  teachersTab :any =[];
  adminsTab :any =[];

  acceptTeacher : any={};

  // to navigate with sidebar
  selectedTab: string = 'Teachers Table';
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllTeachers();
    this.getAllAdmins();
  }


  getAllAdmins(){
    this.userService.getAdmins().subscribe((res)=>{
      this.adminsTab = res.admins
    })
  }

  getAllStudents(){
    this.userService.getStudents().subscribe((res)=>{
      this.studentsTab = res.students
    })
  }

  getAllTeachers(){
    this.userService.getTeachers().subscribe((res)=>{
      this.teachersTab = res.teachers
    })
  }

  // ********************** Edit user ***********************
  editUser(user: any) {
    Swal.fire({
      title: 'Edit User',
      html: `
        <input id="fullName" class="swal2-input" value="${user.fullName}">
        <input id="email" class="swal2-input" value="${user.email}">
        <input id="phone" class="swal2-input" value="${user.phone}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          fullName: (<HTMLInputElement>document.getElementById('fullName')).value,
          email: (<HTMLInputElement>document.getElementById('email')).value,
          phone: (<HTMLInputElement>document.getElementById('phone')).value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let obj = result.value;
        obj._id = user._id
        // Envoyez les données mises à jour à votre backend pour la mise à jour
        this.userService.updateUserProfile(obj).subscribe((res) => {
          if (res.isUpdated) {
            console.log('User updated successfully');
            // Mettez à jour la liste des étudiants après la mise à jour
            this.getAllStudents();
            this.getAllTeachers();
            this.getAllAdmins();
            Swal.fire('Success', 'User details updated successfully', 'success');
          } else {
            Swal.fire('Error', 'Failed to update User details', 'error');
          }
        }, (error) => {
          console.error('Error updating user details:', error);
          Swal.fire('Error', 'An error occurred while updating user details', 'error');
        });
      }
    });
  }
  
  // ******************** Delete user ********************
  deleteUser(id: any){
    this.userService.swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Api backend
        this.userService.deleteUserProfile(id).subscribe((res)=>{
          console.log("here response from backend", res.msg);
          this.getAllStudents();
          this.getAllTeachers();
          this.getAllAdmins();
        })
        this.userService.swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.userService.swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error"
        });
      }
    });
  }

  // ******************* validate teacher ***************
  validateTeacher(id: any){
    this.acceptTeacher.id = id
    this.acceptTeacher.status = "CONFIRMED"
    this.userService.statusTeacherUpdate(this.acceptTeacher).subscribe((res)=>{
      console.log("here response from backend", res.isUpdated);
      this.getAllTeachers();
    });
  }

  
}
