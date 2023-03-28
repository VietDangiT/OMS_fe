import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  saleByLocationURL!: string;
  constructor(private _http: HttpClient) {
    this.saleByLocationURL = environment.baseURL + '/sale-by-location';
    
  }

  getSaleByLocation(location: string): Observable<any> {
    var country = location.toLowerCase().split(' ').join();

    switch (country) {
      case 'malaysia':
        return this._http.get(`${this.saleByLocationURL}/sale-malaysia.json`).pipe();
      case 'singapore':
        return this._http.get(`${this.saleByLocationURL}/sale-singapore.json`).pipe();
      default:
        return this._http.get(`${this.saleByLocationURL}/sale-vietnam.json`).pipe();
    }
  }

  getCountriesSaleInTotal(date: any): Observable<any>{
    switch (date) {
      case "month":
        return this._http.get(`${this.saleByLocationURL}/total-countries-sale-by-month.json`).pipe();
        case "year":
          return this._http.get(`${this.saleByLocationURL}/total-countries-sale-by-year.json`).pipe();
      default:
        return this._http.get(`${this.saleByLocationURL}/total-countries-sale-by-week.json`).pipe();
    }
    
  }

  getLeads(date: any): Observable<any>{
    switch (date) {
      case "month":
        return this._http.get(`${this.saleByLocationURL}/leads-by-month.json`).pipe();
        case "year":
          return this._http.get(`${this.saleByLocationURL}/leads-by-year.json`).pipe();
      default:
        return this._http.get(`${this.saleByLocationURL}/leads-by-week.json`).pipe();

    }
  }

  getCountriesSale(date: any): Observable<any>{
    switch (date) {
      case "month":
        return this._http.get(`${this.saleByLocationURL}/countries-sale-by-month.json`).pipe();
        case "year":
          return this._http.get(`${this.saleByLocationURL}/countries-sale-by-year.json`).pipe();
      default:
        return this._http.get(`${this.saleByLocationURL}/countries-sale-by-week.json`).pipe();
    }
  }
}
