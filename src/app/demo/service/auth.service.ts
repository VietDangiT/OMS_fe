import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient) { }

  login(user: any) : Observable<any>{    
    return this._http.post(`https://localhost:7121/api/auth/login`, user, {
      responseType: "text"
    })
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
