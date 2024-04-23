import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-listtaks',
  templateUrl: './listtaks.component.html',
  styleUrls: ['./listtaks.component.scss']
})
export class ListtaksComponent implements OnInit {

  id: any;
  data: any;
  data2: any;
  constructor(private cs: ChapterService, private ActivatedRoute: ActivatedRoute) {
    this.id = this.ActivatedRoute.snapshot.params['id'];
  }

  getData() {
    this.cs.getChapter(this.id).subscribe(res => {
      this.data = res
      this.data2 = this.data.tasks
      console.log(this.data2)
    })
  }

  delete(id: any) {
    this.cs.delettask(this.id, id).subscribe(res => {
      console.log(res)
      this.getData()
    })
  }

  ngOnInit(): void {
    this.getData();
  }

}
