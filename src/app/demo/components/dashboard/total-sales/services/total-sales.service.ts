import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TotalSalesApiResponse,
  TotalSalesTableApiResponse,
} from '../models/total-sales.models';

@Injectable({
  providedIn: 'root',
})
export class TotalSalesService {
  private readonly _url = `https://localhost:7121/api/TotalSales`;

  constructor(private readonly http: HttpClient) {}

  getTotalSalesTable(
    fromDate: string,
    toDate: string,
    page: number = 1,
    itemsPerPages: number = 20
  ): Observable<TotalSalesTableApiResponse> {
    return this.http.get<TotalSalesTableApiResponse>(
      `${this._url}/table?fromDate=${fromDate}&toDate=${toDate}&Page=${page}&ItemPerPages=${itemsPerPages}`
    );
  }

  getTotalSales(
    fromDate: string,
    toDate: string
  ): Observable<TotalSalesApiResponse[]> {
    return this.http.get<TotalSalesApiResponse[]>(
      `${this._url}?fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  getReturn(
    fromDate: string,
    toDate: string
  ): Observable<TotalSalesApiResponse[]> {
    return this.http.get<TotalSalesApiResponse[]>(
      `${this._url}/return?fromDate=${fromDate}&toDate=${toDate}`
    );
  }
}
