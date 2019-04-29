import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Http, RequestOptions } from '@angular/http';
import { RestUrlService } from '../service/rest-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private signinLink:string="http://localhost:8080/signin";
  private signUpLink:string="http://localhost:8080/signup";
  
  constructor(private http:Http,private restUrlService:RestUrlService) { }

  signUp(credentials){

    return this.http.post(this.restUrlService.getRestUrls("signup"),JSON.stringify(credentials));    
    
  }

  login(credentials){
  //   let options = {
  //     headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
  // };
  
    return this.http.post(this.restUrlService.getRestUrls("signin"),JSON.stringify(credentials));
  }

  logout(){
      //localStorage.removeItem('token');
      localStorage.clear();
      sessionStorage.clear();
    
  }

  changePassword(credentials){
    //console.log('In Auth service:'+credentials);
    return this.http.post(this.restUrlService.getRestUrls("changePassword"),JSON.stringify(credentials));    
    
  }

  resetPassword(credentials){
    //console.log('In Auth service:'+credentials);
    return this.http.post(this.restUrlService.getRestUrls("resetPassword"),JSON.stringify(credentials));    
    
  }

  
  verifyvCode(credentials){
    return this.http.post(this.restUrlService.getRestUrls('verifyAccount'),JSON.stringify(credentials));
  }

  executeHttpUrl(urlKey,credentials){
    return this.http.post(this.restUrlService.getRestUrls(urlKey),JSON.stringify(credentials));
  }

  isLoggedIn(){
    let jwtHelperService=new JwtHelperService();
    let token=localStorage.getItem('token');
    if(!token)
      return false;
    let isExpired=jwtHelperService.isTokenExpired(token);
    //console.log("isExpired:"+isExpired);
    return !isExpired;    
  }

  setUserName(userName){
    let jwtHelperService=new JwtHelperService();
    let token=localStorage.getItem('token');
    let decodedToken=new JwtHelperService().decodeToken(token).sub;
    let obj=JSON.parse(decodedToken);
    //console.log("hi:"+obj.userName);
  }

  getUserName(){
    let token=localStorage.getItem('token');
    if(token){
      let decodedToken=new JwtHelperService().decodeToken(token).sub;
      let obj=JSON.parse(decodedToken);
      return obj.userName;
    }
    return null;
  }

  getIsAccountVerified(){
    let isAccountVerified:boolean=JSON.parse(localStorage.getItem('isAccountVerified'));

    if(!isAccountVerified)
    return false;
    return isAccountVerified;
  }
}
