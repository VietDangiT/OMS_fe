import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { tap } from 'rxjs';
import { BaseChart, LocationByCustomerResponse } from '../interfaces/customer.models';


@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.component.html',
  styleUrls: ['./customer-location.component.scss']
})
export class CustomerLocationComponent implements OnChanges {
  @Input() filterArr: string[] = ['', ''];
  totalSale: number = 0;
  chartData: string[][];

  locationCustomer: { displayText: string; value: number }[] = [];

  routerLink = 'sale-by-location';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  constructor(private customerService: CustomerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr'].currentValue) {
      if (this.filterArr[0] && this.filterArr[1]) {
        this.filterArr = changes['filterArr']?.currentValue;
        this.getTotalSaleByLocation(this.filterArr);

        this.queryParams = {
          fDate: this.filterArr[0],
          tDate: this.filterArr[1],
        };
      }
    }
  }


  getTotalSaleByLocation(filterArr = ['', '']) {
    this.customerService
      .getCustomerByCountry(filterArr)
      .pipe(
        tap((result: LocationByCustomerResponse) => {
          const { customerByCountry: data } = result;

          this.totalSale = 0;

          this.locationCustomer.length = 0;

          const temp = [['Country', 'Sale']];

          data.forEach((item: BaseChart) => {
            this.totalSale += item.value;
            temp.push([`${item.displayText}`, item.value.toString()]);
            this.locationCustomer.push({
              displayText: item.displayText,
              value: item.value,
            });
          });

          this.chartData = [...temp];
        })
      )
      .subscribe();
  }


  // getTotalSaleByLocation(filterArr = ['', '']) {
  //   this.customerService
  //     .getCustomerByCountry(filterArr)
  //     .pipe(
  //       tap((result: LocationByCustomerResponse) => {
  //         const { customerByCountry: data } = result;
  //         this.locationCustomer.length = 0;
  //         const temp = [['Country','Value']];
  //         data.forEach((item: BaseChart) => {
  //           temp.push([`${item.displayText}`, item.value.toString()]);
  //         this.locationCustomer = data;
  //         });
  //         this.chartData = [...temp];
  //       })
  //     )
  //     .subscribe();
  // }

}
