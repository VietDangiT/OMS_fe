import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_CHANNELS_TABLE,
  GET_CHANNEL_STATUS,
  GET_COUNTRIES,
} from '../constants/channel.constants';
import {
  ChannelParams,
  ChannelStatusApiResponse,
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

  getChannelStatus(id: number): Observable<ChannelStatusApiResponse> {
    return this.apollo
      .watchQuery<ChannelStatusApiResponse>({
        query: GET_CHANNEL_STATUS,
        variables: {
          countryId: id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
