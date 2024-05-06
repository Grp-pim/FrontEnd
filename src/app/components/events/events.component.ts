import { Component, OnInit } from '@angular/core';
import { EventServicesService } from '../../services/events/event-services.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: { [key: string]: any[] } = {};
  daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timeOrder = ['09:00am', '10:00am', '11:00am', '12:00am', '13:00am'];

  constructor(private eventService: EventServicesService) { }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(): void {
    this.eventService.getEventsByWeek().subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  compareTimes(timeA: string, timeB: string): number {
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
  
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
  
    return minutesA - minutesB;
  }

  // getEvents(): void {
  //   this.eventService.getEventsByWeek().subscribe(
  //     data => {
  //       this.events = data;
  //       for (const day in this.events) {
  //         if (this.events.hasOwnProperty(day)) {
  //           this.events[day].sort((a, b) => {
  //             const timeA = a.time.split('-')[0];
  //             const timeB = b.time.split('-')[0];
  //             return this.compareTimes(timeA, timeB);
  //           });
  //         }
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching events:', error);
  //     }
  //   );
  // }

}
