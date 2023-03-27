import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  //SBL: Sale by location
   GetRevenueSBL(){
    return this.http.get(`${this.baseURL}/revenueSBL`);
   }
}
