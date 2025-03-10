import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CountryApiResponse } from '../components/channel/interface/channel.model';

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
  constructor(private apollo: Apollo) {}

  getCountries(): Observable<CountryApiResponse> {
    return this.apollo
      .watchQuery<CountryApiResponse>({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
