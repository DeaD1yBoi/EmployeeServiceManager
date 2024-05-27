import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../../services/services';
import { UserRoleRequestsWrapper } from '../../../../services/models';

@Component({
  selector: 'app-authorized-to-respond',
  templateUrl: './authorized-to-respond.component.html',
  styleUrl: './authorized-to-respond.component.scss',
})
export class AuthorizedToRespondComponent implements OnInit {

  requestsArray: Array<UserRoleRequestsWrapper> = [];

  constructor(private requestsService: RequestsService) {}

  ngOnInit(): void {
    this.fetchAuthorizedRequests();
  }
  fetchAuthorizedRequests() {
    this.requestsService.findRequestsThatCanBeResponded().subscribe({
      next: (res) => {
        this.requestsArray = res;
      }
    })
  }
}
