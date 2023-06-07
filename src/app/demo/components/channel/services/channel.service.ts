import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_CHANNELS_TABLE,
  GET_COUNTRIES,
} from '../constants/channel.constants';
import {
  ChannelParams,
  ChannelTableApiResponse,
  CountryApiResponse,
} from '../interface/channel.component';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private apollo: Apollo) {}

  getCountries(): Observable<CountryApiResponse> {
    return this.apollo
      .watchQuery<CountryApiResponse>({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelsTableData(
    params: ChannelParams
  ): Observable<ChannelTableApiResponse> {
    return this.apollo
      .watchQuery<ChannelTableApiResponse>({
        query: GET_CHANNELS_TABLE,
        variables: {
          ...params,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
