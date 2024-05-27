import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardCountComponent } from './pages/dashboard-count/dashboard-count.component';
import { CountCardComponent } from './components/count-card/count-card.component';
import { TableComponent } from './components/table/table.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ServicesComponent } from './pages/services/services.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { AuthorizedToRespondComponent } from './pages/authorized-to-respond/authorized-to-respond.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    UsersComponent,
    DashboardCountComponent,
    CountCardComponent,
    TableComponent,
    RolesComponent,
    ServicesComponent,
    RequestsComponent,
    AuthorizedToRespondComponent,
    CreateRequestComponent,
    DialogComponent,
    CreateUserComponent,
    CreateEmployeeComponent,
    EmployeesComponent,
    CreateServiceComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
