import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestingService } from 'app/services/testing/testing.service';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.scss']
})
export class AddquizComponent implements OnInit {
testing: any;
name: any;
description: any;
options: any;
solutionCode: any;
difficulty: any;
id:any

addQuiz() {
}

  constructor(private ts: TestingService, private ActivatedRoute:ActivatedRoute) {
    this.id = this.ActivatedRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
  }

}
