import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Channel,
  ChannelParams,
  CountryApiResponse,
} from '../interface/channel.component';

const GET_COUNTRIES = gql`
  query {
    countries {
      id
      countryName
      shortCode
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private _http: HttpClient, private apollo: Apollo) {}

  getChannels(): Observable<Channel> {
    return this._http.get<Channel>(`${environment.apiUrl}/Channel/channels`);
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

  getActiveChannels(): Observable<Channel[]> {
    return this._http.get<Channel[]>(
      `${environment.apiUrl}/Channel/activechannels`
    );
  }

  getCountries(): Observable<CountryApiResponse> {
    return this.apollo
      .watchQuery<CountryApiResponse>({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelsTableData(channelPrams: ChannelParams) {}
}
