import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { MarketplaceApiResponse } from '../models/marketplace.models';
import { UserRoleApiResponse } from '../../user/models/user.models';

const GET_MARKETPLACES = gql`
  query GetChannelStatus($countryId: Int) {
    marketPlaces(countryId: $countryId) {
      marketPlaceName
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  constructor(private apollo: Apollo) {}

  getMarketPlaces(countryId: Number | null): Observable<MarketplaceApiResponse> {
    return this.apollo
      .watchQuery<MarketplaceApiResponse>({
        query: GET_MARKETPLACES,
        variables: {
          countryId: countryId
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
