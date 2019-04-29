import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthServiceService } from './auth-service.service';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import {ForgotPwdComponent} from '../forgot-pwd/forgot-pwd.component';

declare var bootbox:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin:boolean;
  
  constructor(private router:Router,private authService:AuthServiceService,public dialog:MatDialog) { }

  ngOnInit() {
  }

  form = new FormGroup({
    userName: new FormControl('',[
              Validators.required,
              Validators.minLength(3)]),
    password: new FormControl('',Validators.required)
  });
  
  
  signIn(credentials){
    //console.log(JSON.stringify(credentials));
    
    var dialog = bootbox.dialog({
      message: '<p><i class="fa fa-spin fa-spinner"></i> Logging in...</p>'
  });
  dialog.init(()=>{
      setTimeout(()=>{
        this.authService.login(credentials)
        .subscribe(response=>{
          if(response){
            this.invalidLogin=false;
            //console.log("Login Successful.");
            let token=response.json().token;
            //console.log('new response'+JSON.stringify(response));
            let isAccountVerified=response.json().isAccountVerified;
            localStorage.setItem('token',token);
            localStorage.setItem('isAccountVerified',isAccountVerified);
            this.authService.setUserName(credentials.userName);
            this.router.navigate(['/dashboard']);
          }
        },error=>{
          this.invalidLogin=true;
        });
        dialog.modal('hide');  
        // dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!');
      }, 2000);
  });
  // do something in the background

    

  }


  submit(f){
    //console.log(f);
  }

  get userName(){
    return this.form.get('userName');
  }

  get password(){
    return this.form.get('password');
  }

  forgotPwd(){
  
    const forgotPwdComponent=this.dialog.open(ForgotPwdComponent,{
       
    });
    
  }
}
