import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../components/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient) { }

  GetAll(){
    return this._http.get<User[]>(`${environment.baseURL}/user.json`).pipe();
  }

  getUser(userName: string, users: User[]) {
    if(userName != null){
      const index = users.findIndex(u =>u.username == userName);
      if(index != -1){
        return users[index];
      }
    }
    return false;
  }

  login(userName: any, password: any){
    var user:any;
    this.GetAll().subscribe(u => {
       user = this.getUser(userName, u);
           localStorage.setItem('isUserLoggedIn', user ? "true" : "false"); 
           localStorage.setItem('userName', user ? userName : ""); 
           localStorage.setItem('password', user ? password : ""); 
           localStorage.setItem('role', user ? user.role : ""); 
    })
    // this.isUserLoggedIn = userName == 'admin' && password == 'admin';
  }

  logout(): void {
    // this.isUserLoggedIn = false;
       localStorage.removeItem('isUserLoggedIn'); 
       localStorage.removeItem('userName'); 
       localStorage.removeItem('password'); 
       localStorage.removeItem('role'); 
    }

    isAuthenticated(): boolean{
        const token = localStorage.getItem("isUserLoggedIn");
        return token == "true";
    }
}
