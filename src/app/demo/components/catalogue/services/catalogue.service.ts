import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_PRODUCT_CATALOGUES } from '../constants/catalogue.constants';
import {
  CatalogueParams,
  CatalogueTableApiResponse,
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
}
