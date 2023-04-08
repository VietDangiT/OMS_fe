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

  login(userName: string | null | undefined, password: string | null | undefined) : Observable<string>{
    return this._http.post<string>('https://localhost:7121/api/auth/login', {userName, password});
  }

  logout(): void {
   localStorage.removeItem("token");
  }

  isAuthenticated(): boolean{
      const token = localStorage.getItem("token");
      return token ? true : false;
  }
}
