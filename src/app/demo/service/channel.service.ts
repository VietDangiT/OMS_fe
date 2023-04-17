import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Channel, Country } from '../components/channel/interface/channel.component';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private _http: HttpClient) {}

  getChannels() {
    return this._http.get(`${environment.apiUrl}/Channel/channels`);
  }

  getChannelList(
    rows: number,
    currentPage: number = 1,
    search: string = '',
    countryId: number = 0,
    status: string = ''
  ) {
    return this._http.get(
      `${environment.apiUrl}/Channel?search=${search}&countryId=${countryId}&rows=${rows}&currentPage=${currentPage}&status=${status}`
    );
  }

  getActiveChannels() : Observable<Channel[]>{
    return this._http.get<Channel[]>(`${environment.apiUrl}/Channel/activechannels`)
  }

  getCountries() : Observable<Country[]> {
    return this._http.get<Country[]>(`${environment.apiUrl}/Channel/countries`)
  }
}
