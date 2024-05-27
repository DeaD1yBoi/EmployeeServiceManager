import { ServicesService } from './../../../../services/services/services.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { ServiceRequest } from '../../../../services/models';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss',
})
export class CreateServiceComponent {
  serviceRequest: ServiceRequest = {
    serviceTitle: '',
  };

  errMsg: Array<string> = [];

  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private servicesService: ServicesService
  ) {}

  createService() {
    this.errMsg = [];
    this.servicesService.createService({ body: this.serviceRequest }).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard/services']);
        this.snackBar.openSnackBar('Service and roles for it are created', '', 2500);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errMsg = err.error.validationErrors;
        } else {
          this.errMsg.push(err.error.businessErrorDescription);
        }
      },
    });
  }
}
