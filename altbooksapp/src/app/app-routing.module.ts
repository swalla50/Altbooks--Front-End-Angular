import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { PayrollComponent } from './payroll/payroll.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { SevendaychartComponent } from './sevendaychart/sevendaychart.component';
import { MonthchartComponent } from './monthchart/monthchart.component';

const routes: Routes = [
  {path:'', redirectTo: '/user/login', pathMatch: 'full'},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent},
  {path: 'payroll', component: PayrollComponent},
  {path: 'timesheet', component: TimesheetComponent},
  {path: 'sevendaychart', component: SevendaychartComponent},
  {path: 'monthdaychart', component: MonthchartComponent},
  {
    path: 'user',component:UserComponent,
    children: [
      {path:'registration', component:RegistrationComponent},
      {path:'login', component:LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
