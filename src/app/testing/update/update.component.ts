import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestingService } from 'app/services/testing/testing.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
id: string;
data:any=[]
testing: boolean;
name: any;
description: any;
difficulty: any;
duration: any;
type:any;
  constructor(private ActivatedRoute:ActivatedRoute, private ts:TestingService) { 
    this.id = this.ActivatedRoute.snapshot.params['id'];
  }

  getbyid(){
    this.ts.getById(this.id).subscribe(res=>{
      this.data=res
    this.name=this.data.name
    this.description=this.data.description
    this.difficulty=this.data.difficulty
    this.duration=this.data.duration
    this.type=this.data.type
    })
  }
  addTest() {
    let data:any = {
      _id:this.id,
      name: this.name,
      description: this.description,
      difficulty: this.difficulty,
      duration: this.duration,
      type:this.type
    }
    this.ts.updateTest(this.id,data).subscribe(res=>{
      console.log(res);
      this.testing=true;
    })
  }
  
  ngOnInit(): void {
    this.getbyid()
  }

}
