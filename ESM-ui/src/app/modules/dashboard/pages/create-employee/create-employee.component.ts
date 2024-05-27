import { Component, OnInit } from '@angular/core';
import {
  Departments,
  EmployeeRequest,
  Positions,
} from '../../../../services/models';
import { Router } from '@angular/router';
import {
  DepartmentService,
  EmployeesService,
  PositionsService,
} from '../../../../services/services';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent implements OnInit {
  employeeRequest: EmployeeRequest = {
    fullName: '',
    posId: 0,
    depId: 0,
  };

  errMsg: Array<string> = [];

  departments: Array<Departments | undefined> = [];
  positions: Array<Positions | undefined> = [];

  constructor(
    private router: Router,
    private departmentsService: DepartmentService,
    private positionsService: PositionsService,
    private employeesService: EmployeesService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchPositions();
  }

  fetchDepartments() {
    this.departmentsService.findAll5().subscribe({
      next: (res) => {
        this.departments = res;
      },
    });
  }

  fetchPositions() {
    this.positionsService.findAll3().subscribe({
      next: (res) => {
        this.positions = res;
      },
    });
  }

  createEmployee() {
    this.errMsg = [];
    this.employeesService.createEmployee({ body: this.employeeRequest }).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard']);
        this.snackBar.openSnackBar('Employee created', '', 1000);
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
