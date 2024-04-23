import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserServiceService } from 'app/services/user-service.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  })
export class UserlistComponent implements OnInit {

  userTable:any=[]
  constructor(private us : UserServiceService, ) { }
 
  delete(id: any) {
    console.log(id)
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    // Check if user confirmed
    if (isConfirmed) {
        // Call function to delete user
        // Add your code here to actually delete the user using the provided ID
        console.log("User deleted successfully.");
    
        this.us.deleteUser(id).subscribe(res => {
          console.log(res);
          this.getAll()
        })
    } else {
        // Do nothing or handle cancellation
        console.log("Deletion cancelled.");
    }
}

  getAll()
  {
    this.us.getAllUsers().subscribe(
      res => {
        this.userTable = res;
        console.log(this.userTable);
      },
      err => {
        console.log(err);
      }
    )
  }
  ngOnInit(): void {
    this.getAll();
  }

}
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}

