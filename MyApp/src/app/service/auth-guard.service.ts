import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthServiceService,private router:Router) { }

  canActivate(){
    if(this.authService.isLoggedIn())
    return true;
    this.router.navigate(['login']);
    return false;
  }
}
