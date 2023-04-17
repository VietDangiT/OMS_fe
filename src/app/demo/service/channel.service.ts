import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}
