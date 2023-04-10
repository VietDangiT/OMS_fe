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

  login(user: any) : Observable<any>{
    return this._http.post('https://localhost:7121/api/auth/login', user,{
      responseType:'text'
    });
  }

  logout(): void {
   localStorage.removeItem("token");
  }

  isAuthenticated(): boolean{
      const token = localStorage.getItem("token");
      return token ? true : false;
  }

  getAuthenticationToken(): string{
    const token = localStorage.getItem("token");
    return token ? token : '';
  }
}
