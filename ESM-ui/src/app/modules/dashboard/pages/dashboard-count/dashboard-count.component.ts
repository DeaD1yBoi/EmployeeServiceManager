import { DashboardCountResponse } from './../../../../services/models/dashboard-count-response';
import { Router } from '@angular/router';
import { DashboardService } from './../../../../services/services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-count',
  templateUrl: './dashboard-count.component.html',
  styleUrl: './dashboard-count.component.scss',
})
export class DashboardCountComponent implements OnInit {

  counterResponse: DashboardCountResponse = {};
  counterArray: Array<{ key: string; value: number }> = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCounter();
  }

  fetchCounter() {
    this.dashboardService.getCount().subscribe({
      next: (res)=>{
        this.counterResponse = res;
        this.counterArray = Object.entries(res).map(([key, value]) => ({ key, value }));
      }
    })
  }

}
