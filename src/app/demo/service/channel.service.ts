import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private _http: HttpClient) { }

  getChannels(){
    return this._http.get(`${environment.apiUrl}/Channel/channels`)
  }
}
