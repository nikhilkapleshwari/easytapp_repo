import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidators } from '../signup/PasswordMatchValidator';
import { ForgotPwdService } from '../service/forgot-pwd.service';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import { AuthServiceService } from '../login/auth-service.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

declare var bootbox:any;
@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.css']
})
export class PwdResetComponent implements OnInit {

  constructor(private router:Router,private forgotPwdService:ForgotPwdService,private authService:AuthServiceService) { }

  message:string;


  ngOnInit() {
    this.forgotPwdService.currentMessage.subscribe(message=>this.message=message);
    //console.log('userId in pwd-reset:'+this.message);
  }

  form = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirmPassword:new FormControl('',Validators.required)},{validators:PasswordMatchValidators.matchPassword});

    get password(){
      return this.form.get('password');
    }

    setPwd(credentials){
      //console.log('initial credentials:'+JSON.stringify(credentials));
      //console.log('message is:'+this.message);
      credentials['userName']=this.message;

    //console.log('final credentials:'+JSON.stringify(credentials));
        
        var dialog = bootbox.dialog({
          message: '<p><i class="fa fa-spin fa-spinner"></i> resetting password...</p>'
      });

      dialog.init(()=>{
          setTimeout(()=>{
              this.authService.resetPassword(credentials).subscribe(response=>{
                  //console.log('response:'+JSON.stringify(response));
                  //console.log('status:'+response.status);
                  if(response.status===201)
                  dialog.find('.bootbox-body').html('<p>Password reset,Kindly login with new password</p>');
                  else
                  dialog.find('.bootbox-body').html('<p>Something went wrong while password reset.</p>');
                  this.router.navigate(['/login']);
              },error=>{
                dialog.find('.bootbox-body').html('<p>'+error.json().message+'</p>');
              });
            }, 2000);
      });  
    }

}
