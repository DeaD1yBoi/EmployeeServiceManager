import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../../services/services';
import { Services } from '../../../../services/models';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{

  servicesArray : Array<Services> = [];

  constructor(
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchServices();
  }
  fetchServices() {
    this.servicesService.findAll().subscribe({
      next: (res) => {
        this.servicesArray = res;
      }
    })
  }

}
