import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {

  selectedTab: string = 'Dashboard';
  
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
