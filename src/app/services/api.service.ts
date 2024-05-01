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
  // fetch Test List
  getAllTests(): Observable<any> {
    return this.http.get(`${this.url}/api/test`).pipe(
      catchError((error) => {
        console.error('error fetching Tests', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  getTestByUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/api/test/getTestByUser/${id}`).pipe(
      catchError((error) => {
        console.error('error fetching Tests by user ID', error);
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
  getAllItems(): Observable<any> {
    return this.http.get(`${this.url}/api/chapter/getAllItems`).pipe(
      catchError((error) => {
        console.error('An error occurred while fetching items', error);
        return throwError('Failed to fetch items; please try again later.');
      })
    );
  }
  updateTest(testId: string, updateData: any): Observable<any> {
    console.log('Updating test with ID:', testId, 'and data:', updateData);

    return this.http.put(`${this.url}/api/test/${testId}`, updateData).pipe(
      catchError((error) => {
        console.error('An error occurred while updating items', error);
        return throwError('Failed to update test;please try again later.');
      })
    );
  }

  sendTestLinkByEmail(
    candidates: any[],
    emailContent: string,
    modification: any
  ): Observable<any> {
    return this.http
      .post(`${this.url}/api/test/sendTestLinkByEmail`, {
        candidates,
        emailContent,
        modification,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'An error occurred while sending the test link:',
            error
          );
          return throwError(
            'An error occurred while sending the test link; please try again later.'
          );
        })
      );
  }
  createSubmission(sub: any): Observable<any> {
    return this.http.post(`${this.url}/api/test/sub`, sub).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  getSubmissionPerUser(testId: any): Observable<any> {
    return this.http.get(`${this.url}/api/test/sub/${testId}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
 
}