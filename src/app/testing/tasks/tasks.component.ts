import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestingService } from 'app/services/testing/testing.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  id: any;
  data: any = []
  data2: any = []
  constructor(private ActivatedRoute: ActivatedRoute, private Ts: TestingService) {
    this.id = this.ActivatedRoute.snapshot.params['id'];
  }

  getData() {
    this.Ts.getById(this.id).subscribe(res => {
      console.log("Response received:", res); // Log the entire response
      this.data = res;
      this.data2 = this.data.tasks;
      console.log("Data received:", this.data2); // Log the array of tasks
    });
  }
  deleteTask(idtask:any){
    this.Ts.deleteTask(this.id,idtask).subscribe(res => {
      console.log("Response received:", res); // Log the entire response
    this.getData(); 
    });
  }
  ngOnInit(): void {
    this.getData();
  }

}
