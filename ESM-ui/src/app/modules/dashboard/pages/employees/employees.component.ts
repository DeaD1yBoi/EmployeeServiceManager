import { Component, OnInit } from '@angular/core';
import { Employees } from '../../../../services/models';
import { EmployeesService } from '../../../../services/services';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit{

  requestsArray: Array<Employees> = [];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeesService.findAll4().subscribe({
      next:(res)=>{
        this.requestsArray = res;
      }
    })
  }

}
