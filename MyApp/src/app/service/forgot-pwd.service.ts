import { Injectable } from '@angular/core';
import { RestUrlService } from './rest-url.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPwdService {

  constructor(private router:Router,private http:HttpClient,private restUrlService:RestUrlService) { }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  validateLink(token){

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Access-Control-Allow-Origin','*')
  };
    
    var finalUrl=this.restUrlService.getRestUrls('verifyForgotPwdLink')+token;
    //console.log('finalUrl:'+finalUrl);
    this.http.get(finalUrl,options)
    .subscribe(response=>{
      //console.log('response:'+response);
      if(response){
        //console.log('response:'+JSON.stringify(response));
        var userName=JSON.parse(JSON.stringify(response)).message;
        //console.log('userName:'+userName);
        this.changeMessage(userName);
        this.router.navigate(['/pwdreset']);
        }
    },error=>{
        //console.log('err:'+JSON.stringify(error));
    });
  }
}
