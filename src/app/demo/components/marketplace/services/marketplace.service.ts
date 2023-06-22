import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { MarketplaceApiResponse } from '../models/marketplace.models';
import { UserRoleApiResponse } from '../../user/models/user.models';

const GET_MARKETPLACES = gql`
  query {
    marketPlaces {
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

  getMarketPlaces(): Observable<MarketplaceApiResponse> {
    return this.apollo
      .watchQuery<MarketplaceApiResponse>({
        query: GET_MARKETPLACES,
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
