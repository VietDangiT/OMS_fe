import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Channel, Country } from '../components/channel/interface/channel.component';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private _http: HttpClient) { }

  getChannels() : Observable<Channel[]>{
    return this._http.get<Channel[]>(`${environment.apiUrl}/Channel`)
  }

  getActiveChannels() : Observable<Channel[]>{
    return this._http.get<Channel[]>(`${environment.apiUrl}/Channel/activechannels`)
  }

  getCountries() : Observable<Country[]> {
    return this._http.get<Country[]>(`${environment.apiUrl}/Channel/countries`)
  }
}
