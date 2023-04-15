import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseChart, BaseInterface, Statistic } from '../components/dashboard/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  
  saleByLocationURL!: string;
  constructor(private _http: HttpClient) {
    this.saleByLocationURL = environment.baseURL + '/sale-by-location';
  }

  getSaleOnChannel(url: string) {
    return this._http.get(url).pipe();
  }

  getSaleByLocation(location: string): Observable<any> {
    var country = location.toLowerCase().split(' ').join();

    return this._http
      .get(`${this.saleByLocationURL}/sale-${country}.json`)
      .pipe();
  }

  getCountriesSaleInTotal(date: any): Observable<any> {
    if (date != null) {
      return this._http
        .get(`${this.saleByLocationURL}/total-countries-sale-by-${date}.json`)
        .pipe();
    }
    return this._http
      .get(`${this.saleByLocationURL}/total-countries-sale-by-week.json`)
      .pipe();
  }

  getLeads(date: any): Observable<any> {
    if (date != null) {
      return this._http
        .get(`${this.saleByLocationURL}/leads-by-${date}.json`)
        .pipe();
    }
    return this._http
      .get(`${this.saleByLocationURL}/leads-by-week.json`)
      .pipe();
  }

  getCountriesSale(date: any): Observable<any> {
    if (date != null) {
      return this._http
        .get(`${this.saleByLocationURL}/countries-sale-by-${date}.json`)
        .pipe();
    }
    return this._http
      .get(`${this.saleByLocationURL}/countries-sale-by-week.json`)
      .pipe();
  }

  getTableData(pageNumber: number = 0) {
    if (pageNumber < 0) {
      return this._http
        .get(`${this.saleByLocationURL}/table-data-0.json`)
        .pipe();
    }
    return this._http
      .get(`${this.saleByLocationURL}/table-data-${pageNumber}.json`)
      .pipe();
  }

  getOrders() {
    return this._http.get<any>(`./assets/demo/data/OrderedList.json`).pipe();
  }

  GetProductCatalogs() {
    return this._http
      .get<any>('./assets/demo/data/product-catalogs.json')
      .pipe();
  }

  getSaleByChannel(
    fromDate: string = '',
    toDate: string = ''
  ) {
    return this._http
      .get<any>(
        `${environment.apiUrl}/Dashboard/channels/sale?fromDate=${fromDate}&toDate=${toDate}`
      );
  }

  getTotalSaleByLocation(fromDate: string = '', toDate: string = '') {
    return this._http
      .get<any>(
        `${environment.apiUrl}/Dashboard/locations/sale?fromDate=${fromDate}&toDate=${toDate}`
      );
  }

  getTotalSale(filter: string[]) {
    return this._http
      .get(
        `${environment.apiUrl}/Dashboard/sales?fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }

  getTotalReturn(filter: string[]) {
    return this._http
      .get(
        `${environment.apiUrl}/Dashboard/returns/totalreturn?fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }

  getTotalOrder(filter: string[]) {
    return this._http
      .get(
        `${environment.apiUrl}/Dashboard/orders?fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }

  getTopSellingProducts(filter: string[]) {
    return this._http
      .get(
        `${environment.apiUrl}/Dashboard/product/totalsale?fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }

  getProductVariant(): Observable<BaseInterface[]> {
    return this._http
      .get<BaseInterface[]>(`${environment.apiUrl}/Product/productvariants`);
  }

  getProductCatalogs(id: number, filter: string[]) : Observable<BaseChart[]>{
    return this._http
      .get<BaseChart[]>(
        `${environment.apiUrl}/Dashboard/productcatalog/itemssold?productCatalogId=${id}&fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }
  
  getOrderStatus(id:number, filter: string[]) :Observable<Statistic[]> {
    return this._http
      .get<Statistic[]>(
        `${environment.apiUrl}/Dashboard/orders/statusorders?channelId=${id}&fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }
  getProductStatus(id:number, filter: string[]) :Observable<Statistic[]> {
    return this._http
      .get<Statistic[]>(
        `${environment.apiUrl}/Dashboard/productchannel/statusproduct?channelId=${id}&fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }
  getStockStatus(id:number, filter: string[]) :Observable<Statistic[]> {
    return this._http
      .get<Statistic[]>(
        `${environment.apiUrl}/Dashboard/productchannel/statusquantity?channelId=${id}&fromDate=${filter[0]}&toDate=${filter[1]}`
      );
  }
}
