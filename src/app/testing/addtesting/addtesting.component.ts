import { Component, OnInit } from '@angular/core';
import { TestingService } from 'app/services/testing/testing.service';

@Component({
  selector: 'app-addtesting',
  templateUrl: './addtesting.component.html',
  styleUrls: ['./addtesting.component.scss']
})
export class AddtestingComponent implements OnInit {
name: any;
description: any;
difficulty: any;
duration: any;
testing: boolean
type: any;
  constructor(private ts:TestingService) { }
  addTest() {
    let data:any = {
      name: this.name,
      description: this.description,
      difficulty: this.difficulty,
      duration: this.duration,
      type:this.type
    }
    this.ts.addTest(data).subscribe(res => {
      console.log(res);
      this.testing = true;
    })
  }
  
  
  ngOnInit(): void {
  }

}
