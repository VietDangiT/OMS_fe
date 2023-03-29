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

  getSaleOnChannel(url: string){
    return this._http.get(url).pipe();
  }

  getSaleByLocation(location: string): Observable<any> {
    var country = location.toLowerCase().split(' ').join();
  
    return this._http.get(`${this.saleByLocationURL}/sale-${country}.json`).pipe();
  }

  getCountriesSaleInTotal(date: any): Observable<any>{
    if(date != null){
      return this._http.get(`${this.saleByLocationURL}/total-countries-sale-by-${date}.json`).pipe();
    }
    return this._http.get(`${this.saleByLocationURL}/total-countries-sale-by-week.json`).pipe();
  }

  getLeads(date: any): Observable<any>{
    if(date != null){
      return this._http.get(`${this.saleByLocationURL}/leads-by-${date}.json`).pipe();
    }
    return this._http.get(`${this.saleByLocationURL}/leads-by-week.json`).pipe();
  }

  getCountriesSale(date: any): Observable<any>{
    if(date != null){
      return this._http.get(`${this.saleByLocationURL}/countries-sale-by-${date}.json`).pipe();
    }
    return this._http.get(`${this.saleByLocationURL}/countries-sale-by-week.json`).pipe();
  }

  getTableData(pageNumber: number = 0){
    if(pageNumber < 0){
      return this._http.get(`${this.saleByLocationURL}/table-data-0.json`).pipe();
    }
    return this._http.get(`${this.saleByLocationURL}/table-data-${pageNumber}.json`).pipe();
  }
}
