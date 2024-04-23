import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-update-chapter',
  templateUrl: './update-chapter.component.html',
  styleUrls: ['./update-chapter.component.scss']
})
export class UpdateChapterComponent implements OnInit {
update() {

  let data:any={
    _id:this.id,
    name: this.chaptername,
    language: this.language,
    chapterNumber: this.chapterNumber

  }
  this.cs.updateChapter(this.id,data).subscribe(res=>{
    console.log(res);
this.testing=true;
  })
}

  id:any
  chaptername: any;
language: any;
chapterNumber: any;
data:any=[]
testing: boolean;

  constructor(private ActivatedRoute:ActivatedRoute,private cs : ChapterService) { 
    this.id=this.ActivatedRoute.snapshot.params['id']
  }

  getdata(){
    this.cs.getChapter(this.id).subscribe(res=>{
      this.data=res
      console.log(res)

      this.chaptername=this.data.name
      this.language=this.data.language
      this.chapterNumber=this.data.chapterNumber
    })
  }
  ngOnInit(): void {
    this.getdata()
  }

}
