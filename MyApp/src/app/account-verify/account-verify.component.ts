import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../login/auth-service.service';
import { MatDialogRef } from '@angular/material';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
declare var bootbox:any;
@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.css']
})
export class AccountVerifyComponent implements OnInit {

  invalidvCode;
  flag:boolean=false;
  private subscription: Subscription;
  tick;
  constructor(public dialogRef:MatDialogRef<AccountVerifyComponent>,private authService:AuthServiceService) { }

  ngOnInit() {
    // let timer = TimerObservable.create(2000, 1000);
    // this.subscription = timer.subscribe(t => {
    //   this.tick = t;
    //   //console.log('tick:'+this.tick);
    // });    
  }

  getFlag(){
    return sessionStorage.getItem('isvCodeSent');
  }

  setFlag(flag){
    sessionStorage.setItem('isvCodeSent',flag);
  }

  form = new FormGroup({
    vCode: new FormControl('',Validators.required)});

    verifyAccount(credentials){
      credentials['userName']=this.authService.getUserName();
      //console.log('userName:'+this.authService.getUserName());
      this.authService.verifyvCode(credentials).subscribe(response=>{
        var result=response.json();
        if(result){
          bootbox.alert('Account verified successfully.');
        this.invalidvCode=false;
        localStorage.setItem('isAccountVerified','true');
        this.dialogRef.close();
      }else{
        this.invalidvCode=true;
        //console.log('Verification code invalid/expired.');
      }
      });
    }  
    
    sendvCode(credentials){
      credentials['userName']=this.authService.getUserName();
      this.authService.executeHttpUrl('sendvCode',credentials).subscribe(response=>{
        var result=response.json();
        this.setFlag(true);
        bootbox.alert(result);
      });
      
    }
}
