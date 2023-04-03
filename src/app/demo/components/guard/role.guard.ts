import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    // const tokenPayload = decode(token);
    const role = localStorage.getItem('role');
    
    if (
      !this.auth.isAuthenticated() || role != expectedRole
      // tokenPayload.role !== expectedRole
    ) {
      alert("You are not authorized");
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
