import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidators } from './PasswordMatchValidator';
import { Router } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
declare var bootbox:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router,private authService:AuthServiceService) { }
  errorString:string;
  invaliSignup:boolean;

  ngOnInit() {
  }

  form = new FormGroup({
    userName: new FormControl('',[
              Validators.required,
              Validators.minLength(3),
              Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])            
            ]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirmPassword:new FormControl('',Validators.required)},{validators:PasswordMatchValidators.matchPassword});


  get userName(){
    return this.form.get('userName');
  }

  get password(){
    return this.form.get('password');
  }


  signUp(credentials){
    //console.log(JSON.stringify(credentials));

    var dialog = bootbox.dialog({
      message: '<p><i class="fa fa-spin fa-spinner"></i> Creating user</p>'
  });
  dialog.init(()=>{
      setTimeout(()=>{
        
        
        this.authService.signUp(credentials)
    .subscribe(response=>{
      if(response){
        //console.log("User created Successful.");
        let token=response.json().token;
        let vCode=response.json().vCode;
        localStorage.setItem('token',token);
        this.authService.setUserName(credentials.userName);
        this.router.navigate(['/dashboard']);
        dialog.find('.bootbox-body').html('<h4>Welcome '+credentials.userName+'!</h4>Now you can add your favourite torrent searches to dashboard and get notification for it.');
        //bootbox.alert("<h4>Welcome "+credentials.userName+"!</h4>Now you can add your favourite torrent searches to dashboard.");
      }
    },error=>{
      this.invaliSignup=true;
      this.errorString=error.json().message;
      dialog.find('.bootbox-body').html('something went wrong while creating user.');
    });
    }, 2000);
  });
  }

}
