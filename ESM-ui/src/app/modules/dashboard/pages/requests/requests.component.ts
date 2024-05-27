import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../../services/services';
import { UserRoleRequestsWrapper } from '../../../../services/models';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {

  requestsArray: Array<UserRoleRequestsWrapper> = [];

  constructor(
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
  }
  fetchRequests() {
    this.requestsService.findAll2().subscribe({
      next:(res)=>{
        this.requestsArray = res;
      }
    })
  }
}
