import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient,private router: Router) {}

  private url = 'http://localhost:3000';


  // post method
  executeCode(code: string): Observable<any> {
    const ideUrl = `${this.url}/api/chapter/compile`;
    return this.http.post(ideUrl, { code }).pipe(
      catchError((error) => {
        // Process error and return a user-friendly message or rethrow
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  // get method
  getAllChapters(): Observable<any> {
    return this.http.get(`${this.url}/api/chapter`).pipe(
      catchError((error) => {
        console.error('An error occurred while fetching chapters', error);
        return throwError('Failed to fetch chapters; please try again later.');
      })
    );
  }

 getRandomTask(currentChapter: number): Observable<any> {
  return this.http.get(`${this.url}/api/chapter/${currentChapter}/random`).pipe(
    catchError((error) => {
      console.error('An error occurred while fetching random task', error);
      return throwError('Failed to fetch random task; please try again later.');
    })
  );
}
  createTest(test: any): Observable<any> {
    return this.http.post(`${this.url}/api/test`, test).pipe(
      catchError((error) => {
        console.error('An error occurred while creating the test:', error);
        return throwError('An error occurred while creating the test; please try again later.');
      })
    );
  }

  sendTestLinkByEmail(candidates: any[], emailContent: string, modification: any): Observable<any> {
    return this.http.post(`${this.url}/api/test/sendTestLinkByEmail`, { candidates, emailContent, modification }).pipe(
      catchError((error) => {
        console.error('An error occurred while sending the test link:', error);
        return throwError('An error occurred while sending the test link; please try again later.');
      })
    );
  }

  // fetch Test List
  getAllTests(): Observable<any> {
    return this.http.get(`${this.url}/api/test`).pipe(
      catchError((error) => {
        console.error('error fetching Tests', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }

  // fetch Test List
  getTestById(id: string): Observable<any> {
    return this.http.get(`${this.url}/api/test/${id}`).pipe(
      catchError((error) => {
        console.error('error fetching Tests', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  // coompare quiz
  compareQuiz(testId: string, selectedOptions: any[]): Observable<any> {
    return this.http.post<any>(`${this.url}/api/test/compare`, {
      testId,
      selectedOptions,
    });
  }
}
