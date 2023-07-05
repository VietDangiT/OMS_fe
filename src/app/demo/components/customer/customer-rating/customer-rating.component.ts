import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { ListboxModule } from 'primeng/listbox';
import { CustomerService } from '../services/customer.service';
import { BaseChart, ChannelByRatingCustomer , ChannelByRatingCustomerResponse, RatingByChannelResponse } from '../interfaces/customer.models';
import { BehaviorSubject, tap } from 'rxjs';
import { pieChartColors, pieChartColorsCustomer, pieChartColorsCustomerRating } from '../../share/oms-chart/oms-chart.component';
import { ChannelByCustomer } from '../models/customer.models';
import { log } from 'console';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './customer-rating.component.html',
  styleUrls: ['./customer-rating.component.scss']
})
export class CustomerRatingComponent implements OnChanges {
  @Input() pieOptions: unknown;
  @Input() filterArr: string[];
  public colors = pieChartColorsCustomerRating;
  params: any;
  constructor(private customerService: CustomerService) {}
  pieData: ChartData;
  totalReturn: string = '0';
  stars = "stars"
  routerLink = 'total-orders';
  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };
  ratingByCustomer: { displayText: string; value: number , percentage: number}[] = [];
  reversedObject : { displayText: string; value: number , percentage: number}[] = [];
  // dropdown
  channel:ChannelByRatingCustomer[] ;
  selectedChannel : ChannelByCustomer;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr']?.currentValue && this.filterArr[1]) {
      this.filterArr = changes['filterArr'].currentValue;
      this.customerService
        .getRatingByChannel(this.filterArr)
        .pipe(
          tap((result:RatingByChannelResponse) => {
            const { ratingByChannel: data } = result;
            this.initTotalOrderChart(data);
            this.ratingByCustomer = data;
            // this.onChangeCountry();
            console.log(data)
          })
        )
        .subscribe();
      this.queryParams = {
        fDate: this.filterArr[0],
        tDate: this.filterArr[1],
      };
    };



  }

  initTotalOrderChart(result: BaseChart[]) {
    let totalArr: number[] = [];
    let labelArr: string[] = [];

    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push (`${item.displayText} ${this.stars}`)
    });
    this.pieData = {
      labels: labelArr,
      datasets: [
        {
          data: totalArr,
          backgroundColor: pieChartColorsCustomerRating,
          hoverBackgroundColor: pieChartColors,
        },
      ],
    };
  }







}
