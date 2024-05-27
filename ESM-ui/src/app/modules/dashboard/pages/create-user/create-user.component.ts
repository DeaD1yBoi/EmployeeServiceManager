import { Component, OnInit } from '@angular/core';
import { Employees, RegistrationRequest } from '../../../../services/models';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  EmployeesService,
} from '../../../../services/services';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  createdUser: RegistrationRequest = {
    username: '',
    empId: 0,
    password: '',
  };

  errMsg: Array<string> = [];

  employees: Array<Employees> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: SnackbarService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeesService.findEmployeesWithoutUser().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createUser() {
    this.errMsg = [];
    this.authService.register({ body: this.createdUser }).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard']);
        this.snackBar.openSnackBar('User created', '', 1000);
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
