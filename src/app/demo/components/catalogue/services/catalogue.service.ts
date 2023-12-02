import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_CATALOGUE_DETAIL,
  GET_PRODUCT_CATALOGUES,
  GET_PRODUCT_STATUS,
} from '../constants/catalogue.constants';
import {
  CatalogueDetailApiResponse,
  CatalogueParams,
  CatalogueTableApiResponse,
  ProductStatusApiResponse,
} from '../models/catalogue.models';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  constructor(private apollo: Apollo) {}

  getCatalogues(
    params: CatalogueParams
  ): Observable<CatalogueTableApiResponse> {
    return this.apollo
      .watchQuery<CatalogueTableApiResponse>({
        query: GET_PRODUCT_CATALOGUES,
        variables: {
          ...params,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductStatus(channelId: number): Observable<ProductStatusApiResponse> {
    return this.apollo
      .watchQuery<ProductStatusApiResponse>({
        query: GET_PRODUCT_STATUS,
        variables: {
          channelId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCatalogueDetail(
    id: number,
    channelId: number
  ): Observable<CatalogueDetailApiResponse> {
    return this.apollo
      .watchQuery<CatalogueDetailApiResponse>({
        query: GET_CATALOGUE_DETAIL,
        variables: {
          productVariantId: id,
          channelId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
