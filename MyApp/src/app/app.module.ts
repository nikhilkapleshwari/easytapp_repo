import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponentComponent } from './schedule-component/schedule-component.component';
import { RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { SignupComponent } from './signup/signup.component';
import { RestUrlService } from './service/rest-url.service';
import { FooterComponent } from './footer/footer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule,MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TorrentDialogComponent } from './torrent-dialog/torrent-dialog.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AccountVerifyComponent } from './account-verify/account-verify.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { RouteGuardService } from './service/route-guard.service';
import { PwdResetComponent } from './pwd-reset/pwd-reset.component';

@NgModule({
  declarations: [
    AppComponent, 
    SearchComponentComponent, ScheduleComponentComponent, NavbarComponent, LoginComponent, DashboardComponent,DialogOverviewComponent, SignupComponent, FooterComponent, TorrentDialogComponent, AccountSettingComponent, AccountVerifyComponent, ForgotPwdComponent, PwdResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path:'',component:SearchComponentComponent,canActivate:[RouteGuardService]},
      {path:'easytapp',component:SearchComponentComponent,canActivate:[RouteGuardService]},
      {path:'forgotpwd',component:SearchComponentComponent,canActivate:[RouteGuardService]},
      {path:'schedule',component:ScheduleComponentComponent,canActivate:[AuthGuardService]},
      {path:'login',component:LoginComponent},
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuardService]},
      {path:'signup',component:SignupComponent},
      {path:'pwdreset',component:PwdResetComponent}
    ])
  ],
  entryComponents: [TorrentDialogComponent,AccountSettingComponent,AccountVerifyComponent,ForgotPwdComponent],
  providers: [AuthGuardService,RestUrlService,{ provide: APP_INITIALIZER, useFactory: RestUrlServiceFactory, deps: [RestUrlService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function RestUrlServiceFactory(provider: RestUrlService) {
  return () => provider.load();
}


