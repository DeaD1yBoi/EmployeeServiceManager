import { Component, Input } from '@angular/core';
import {Map } from './map.interface';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrl: './count-card.component.scss',
})
export class CountCardComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() routerLink: string = '';

  iconMap: Map = {
    users: 'fa-solid fa-user',
    employees: 'fa-solid fa-user-tie',
    services: 'fa-solid fa-wrench',
    roles: 'fa-solid fa-gear',
    requests: 'fa-solid fa-file-invoice',
    waitingForResponse: 'fa-solid fa-bell',
  };

  routerLinks: Map = {
    users: 'users',
    employees: 'employees',
    roles: 'roles',
    services: 'services',
    requests: 'requests',
    waitingForResponse: 'requests/authorized',
  }
}
