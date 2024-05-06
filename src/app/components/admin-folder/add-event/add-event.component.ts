import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventServicesService } from '../../../services/events/event-services.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventServicesService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.addEventForm = this.formBuilder.group({
      day:["", [Validators.required]],
      time:["", [Validators.required]],
      eventName:["", [Validators.required]],
      instructor:["", [Validators.required]],
    });
  }

  addEvent(){
    this.eventService.addEvent(this.addEventForm.value).subscribe((response) => {
      console.log("here response from BE", response);
      this.form();
      this.userService.Toast.fire({
        icon: 'success',
        title: 'Event created with success'
      });
    },
    (error) => {
      console.error("Error adding Event:", error);
      this.form();
      this.userService.Toast.fire({
       icon: "error",
       title: "An error was occured while Event create"
      });
    }
    );
  }



}