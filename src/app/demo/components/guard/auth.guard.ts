import { Injectable } from '@angular/core';
import {  Router} from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    return true;
    if(this.authService.isAuthenticated() == false){
      alert("You must sign in to access");
      this.router.navigate(["login"]);
      return false;
     }else{
      return true;
     }
  }
}
