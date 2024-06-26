import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"dashboard",
    loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "**",
    redirectTo:"dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
