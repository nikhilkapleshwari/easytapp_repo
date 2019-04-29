import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, RoutesRecognized } from '@angular/router';
import { ForgotPwdService } from './forgot-pwd.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private router:Router,private forgotPwdService:ForgotPwdService) { }

  //routes=['/login','/signup','/forgotpwd'];
  //new entries
  routes=['','/','/easytapp','/forgotpwd'];
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot,){
    var url=state.url;
    //console.log('url:'+url);
    var subUrl=url.substr(0,10);
    //console.log('subUrl:'+subUrl);
    var result=this.routes.indexOf(url);
    //console.log('result:'+result);
    if(subUrl==='/forgotpwd'){
      var index=url.indexOf("=");
      //console.log('index:'+index);
      var token=url.substr(index+1);
      //console.log('token:'+token);
      this.forgotPwdService.validateLink(token);

      //this.forgotPwdService.validateLink(url);

    }

    if(result > -1 )
    return true;
    return false;
  }
}
