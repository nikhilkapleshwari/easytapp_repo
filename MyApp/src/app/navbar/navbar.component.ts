import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../login/auth-service.service';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import { MatDialog } from '@angular/material';
import { AccountSettingComponent } from '../account-setting/account-setting.component';
import { AccountVerifyComponent } from '../account-verify/account-verify.component';
declare var bootbox:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName:string;

  constructor(private router:Router,public authService:AuthServiceService,public dialog:MatDialog) { 
    this.userName=this.authService.getUserName();
  }
  
  ngOnInit() {
  }

  getLoginLink(){
    return "login";
  }

  // getIsAccountVerified(){
  //   let isAccountVerified:boolean=JSON.parse(localStorage.getItem('isAccountVerified'));
  //   //console.log('in method:'+isAccountVerified);
  //   if(!isAccountVerified)
  //   return false;
  //   return isAccountVerified;
  // }
  
  logout(){
    
    bootbox.confirm("Are you sure to logout?",(result)=>{
      if(result){
        
        var dialog = bootbox.dialog({
          message: '<p><i class="fa fa-spin fa-spinner"></i> Logging out...</p>'
      });
      dialog.init(()=>{
          setTimeout(()=>{
            
              dialog.find('.bootbox-body').html('Logout successfully!');
              this.authService.logout();
              this.userName='';
              localStorage.removeItem('isAccountVerified');
              this.router.navigate(['/']);
            }, 2000);
      });  
      }else
        this.router.navigate(['/dashboard']);
    });
}

changePassword(){
  
  const accountSettingComponent=this.dialog.open(AccountSettingComponent,{
     
  });
  
}

verifyAccount(){
  const torrentDialogComponent=this.dialog.open(AccountVerifyComponent,{     
  });

}
}
