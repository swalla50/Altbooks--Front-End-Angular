import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomDatePipe } from './fresh.pipe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FinDataService } from './fin-data.service';
import { SettingsComponent } from './settings/settings.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { SharedService } from './shared.service';
import { QuestionComponent } from './Components/question/question.component';
import { QuestionadduserComponent } from './Components/questionadduser/questionadduser.component';
import { PayrollComponent } from './payroll/payroll.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import { NgChartsModule } from 'ng2-charts';
import { SevendaychartComponent } from './sevendaychart/sevendaychart.component';
import { MonthchartComponent } from './monthchart/monthchart.component';
import { YearchartComponent } from './yearchart/yearchart.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    SettingsComponent,
    QuestionComponent,
    QuestionadduserComponent,
    PayrollComponent,
    TimesheetComponent,
    CustomDatePipe,
    SevendaychartComponent,
    MonthchartComponent,
    YearchartComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    NgxPlaidLinkModule,
    MatTabsModule,
    NgChartsModule
  ],
  providers: [UserService, FinDataService, SharedService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
