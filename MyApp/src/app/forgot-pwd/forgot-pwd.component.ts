import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { RestUrlService } from '../service/rest-url.service';
import { MatDialogRef } from '@angular/material';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
declare var bootbox:any;
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  constructor(private http:Http,public dialogRef:MatDialogRef<ForgotPwdComponent>,private restUrlService:RestUrlService) { }

  ngOnInit() {
  }

  form = new FormGroup({
    userName: new FormControl('',Validators.required)});

  forgotPwd(credentials){
    var dialog = bootbox.dialog({
      message: '<p><i class="fa fa-spin fa-spinner"></i> Sending password reset link to email id...</p>'
  });
    //console.log('credentials:'+credentials);
    //console.log(JSON.stringify(credentials));

    dialog.init(()=>{
      setTimeout(()=>{
        this.http.post(this.restUrlService.getRestUrls('initForgotPwdLink'),JSON.stringify(credentials))
        .subscribe(response=>{
          //console.log('response in initForgotPwd:'+JSON.stringify(response));
          var status=response.text();
          var userName=JSON.parse(JSON.stringify(credentials)).userName;
          if(status==="SUCCESS"){
            dialog.find('.bootbox-body').html('<p>Password reset link has been sent to email id '+userName+'</p>');
          }else{
            dialog.find('.bootbox-body').html('<p>No User present with this email id '+userName+'</p>');
          this.dialogRef.close();
          }
          this.dialogRef.close();
          
        },error=>{
          //console.log(error);
          this.dialogRef.close();
          });
      },2000);
    });
  }
}
