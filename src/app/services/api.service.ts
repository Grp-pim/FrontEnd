import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090';

  // post method
  executeCode(code: string): Observable<any> {
    const ideUrl = `${this.url}/compile`;
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
    return this.http
      .get(`${this.url}/api/chapter/${currentChapter}/random`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred while fetching chapters', error);
          return throwError(
            'Failed to fetch chapters; please try again later.'
          );
        })
      );
  }
  createTest(test: any): Observable<any> {
    return this.http.post(`${this.url}/api/test`, test).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
}
