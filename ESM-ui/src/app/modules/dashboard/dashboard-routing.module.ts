import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardCountComponent } from './pages/dashboard-count/dashboard-count.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ServicesComponent } from './pages/services/services.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { AuthorizedToRespondComponent } from './pages/authorized-to-respond/authorized-to-respond.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';

const routes: Routes = [{ path: '', component: MainComponent , children:
[
  {path:'', component: DashboardCountComponent},
  {path:'users', component: UsersComponent},
  {path:'users/create', component: CreateUserComponent},
  {path:'roles', component: RolesComponent},
  {path:'services', component: ServicesComponent},
  {path:'services/create', component: CreateServiceComponent},
  {path:'requests', component: RequestsComponent},
  {path:'requests/authorized', component: AuthorizedToRespondComponent},
  {path:'requests/create', component: CreateRequestComponent},
  {path:'employees', component: EmployeesComponent},
  {path:'employees/create', component: CreateEmployeeComponent},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
