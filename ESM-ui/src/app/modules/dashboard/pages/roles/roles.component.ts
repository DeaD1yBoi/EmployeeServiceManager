import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../../services/services';
import { Roles, RolesWrapper } from '../../../../services/models';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit{

  rolesArray : Array<RolesWrapper> = [];

  constructor(
    private rolesService : RolesService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
  }
  fetchRoles() {
    this.rolesService.findAll1().subscribe({
      next: (res) => {
        this.rolesArray = res;
      }
    })
  }

}
