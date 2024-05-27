import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/services';
import { UserWrapper } from '../../../../services/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  usersArray: Array<UserWrapper> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.userService.getAllUsersWithDetails().subscribe({
      next: (res) => {
        this.usersArray = res;
      },
    });
  }
}
