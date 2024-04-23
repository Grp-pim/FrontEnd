import { Component, OnInit } from '@angular/core';
import { TestingService } from 'app/services/testing/testing.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
deleteAll() {
  this.ts.deleteAll().subscribe(res=>{
    console.log(res)
    this.getAll()
  })
}

  testing:any=[]
  constructor(private ts:TestingService) { }

  getAll(){
    this.ts.getAllTests().subscribe(res=>{
      this.testing=res;
      console.log(res)
    })
  }

  delete(id:any){
    const isConfirmed = window.confirm('Are you sure you want to delete this chapter?');
    if (isConfirmed) {
      this.ts.deleteTest(id).subscribe(res => {
        console.log(res);
        this.getAll()
      })
    } else {
      console.log('Deletion cancelled.');
    }
  }
  ngOnInit(): void {
    this.getAll();
  }

}
