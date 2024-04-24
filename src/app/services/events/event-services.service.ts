import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventServicesService {
  eventURL: string = 'http://localhost:3000/api/event';

  constructor(private http: HttpClient) {}

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.eventURL + '/addEvent', event);
  }

  getEventsByWeek(): Observable<any> {
    return this.http.get<any>(this.eventURL + '/eventsByWeek');
  }

  getAllEvent() {
    return this.http.get<{ events: any }>(this.eventURL + '/getAllEvents');
  }

  deleteEvent(eventId: string) {
    return this.http.delete<{ msg: any }>(
      `${this.eventURL}/deleteEvent/${eventId}`
    );
  }
}
