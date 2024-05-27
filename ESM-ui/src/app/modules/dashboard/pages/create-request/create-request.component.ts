import { RequestsService } from './../../../../services/services/requests.service';
import { UserRoleRequestRequest } from './../../../../services/models/user-role-request-request';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../../services/services';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss',
})
export class CreateRequestComponent implements OnInit {

  roleRequest: UserRoleRequestRequest = {
    requestedServiceName: 'Select a service',
    note: '',
    owner: false,
  };

  errMsg: Array<string> = [];

  servicesNames: Array<string | undefined> = [];

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private  requestsService : RequestsService,
    private snackBar: SnackbarService
  ) {}


  ngOnInit(): void {
    this.fetchServicesNames();
  }

  fetchServicesNames() {
    this.servicesService.findAll().subscribe({
      next: (res) => {
        this.servicesNames = res.map((service) => service.srvTitle);
      },
    });
  }

  createRequest() {
    this.errMsg = [];
    this.requestsService.createRequest({body: this.roleRequest}).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard/requests']);
        this.snackBar.openSnackBar("Request created", 'Close', 1000);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errMsg = err.error.validationErrors;
        } else {
          this.errMsg.push(err.error.businessErrorDescription);
        }
      },
    })
  }

}
