import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import { PasswordMatchValidators } from '../signup/PasswordMatchValidator';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AuthServiceService } from '../login/auth-service.service.js';

declare var bootbox:any;

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  constructor(private router:Router,public dialogRef:MatDialogRef<AccountSettingComponent>,private authService:AuthServiceService) { }

  ngOnInit() {
  }
  form = new FormGroup({
    password: new FormControl('',Validators.required),
    currentPassword: new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required)},{validators:PasswordMatchValidators.matchPassword});

    close(): void {
      this.dialogRef.close();
    }

  get password(){
    return this.form.get('password');
  }

  get currentPassword(){
    return this.form.get('currentPassword');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword');
  }

  changePwd(credentials){

    
    credentials['userName']=this.authService.getUserName();
    //console.log(credentials);
    bootbox.confirm("Are you sure to change password?",(result)=>{
      if(result){
        
        var dialog = bootbox.dialog({
          message: '<p><i class="fa fa-spin fa-spinner"></i> Updating password...</p>'
      });
      dialog.init(()=>{
          setTimeout(()=>{
              this.authService.changePassword(credentials).subscribe(response=>{
                  dialog.find('.bootbox-body').html('<p>'+response.json().message+'</p>');
              },error=>{
                dialog.find('.bootbox-body').html('<p>'+error.json().message+'</p>');
              });
              
              this.close();
            }, 2000);
      });  
      }else
      dialog.find('.bootbox-body').html('Password updation cancelled!');
      this.close();
    });
  }
}
