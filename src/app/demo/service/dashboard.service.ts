import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }
  getSaleOnChannel(url: string){
    return this._http.get(url).pipe();
  }
}
