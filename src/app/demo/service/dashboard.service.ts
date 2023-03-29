import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../api/order';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  getSaleOnChannel(url: string) {
    return this._http.get(url).pipe();
  }

  GetOrders() {
    return this._http.get<any>('./assets/demo/data/orders.json').pipe();
  }

  getOrders() {
    return this._http.get<any>(`./assets/demo/data/OrderedList.json`).pipe();
  }

  GetProductCatalogs() {
    return this._http
      .get<any>('./assets/demo/data/product-catalogs.json')
      .pipe();
  }
}
