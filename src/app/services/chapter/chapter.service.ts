import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  delettask(id: any, id1: any) {
    return this.http.delete(`${environment.apiUrl}/chapter/taskApi/` + id + "/" + id1);}
  addTask(data: any) {
    return this.http.post(`${environment.apiUrl}/chapter/taskApi`, data)
  }

  constructor( private http:HttpClient) { }

  getAllChapters(){
    return this.http.get(`${environment.apiUrl}/chapter/`);
  }

  createChapter(body:any){
    return this.http.post(`${environment.apiUrl}/chapter/`,body)
    
  }

  deleteChapter(id:any){
    return this.http.delete(`${environment.apiUrl}/chapter/`+id);
  }

  getChapter(id:any){
    return this.http.get(`${environment.apiUrl}/chapter/`+id);
  }
  updateChapter(id:any,body:any){
    return this.http.put(`${environment.apiUrl}/chapter/`+id,body)
  }

  /*  router.get("/:chapterName/countName", countChaptersByName);
router.get("/:chapterNumber/countNumbe", countChaptersByChapterNumber);
router.get("/:chapterNumber/tasksLength/count", countChaptersByTasksLength);
*/
  countByNames(){
    return this.http.get(`${environment.apiUrl}/chapter/countName/`
    );
  }

  countCHapterNumber(){
    return this.http.get(`${environment.apiUrl}/chapter/countNumbe`
    );
  }
  countByTasksLength(){
    return this.http.get(`${environment.apiUrl}/chapter/tasksLength`
    );
  }
 
 
  ////

  addQuiz(data: any,id:any) {
    return this.http.post(`${environment.apiUrl}/chapter/quizApi/`+id, data)
  }

  deleteQuiz(id: any, id1: any) {
    return this.http.delete(`${environment.apiUrl}/chapter/quizApi/` + id + "/" + id1);
  }
}
