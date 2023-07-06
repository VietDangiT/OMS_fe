import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

import { CustomerService } from '../services/customer.service';
import {
  BaseChart,
  ChannelByRatingCustomer,
  ChannelByRatingCustomerResponse,
  RatingByChannelResponse,
} from '../interfaces/customer.models';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import {
  pieChartColors,
  pieChartColorsCustomer,
  pieChartColorsCustomerRating,
} from '../../share/oms-chart/oms-chart.component';
import { ChannelByCustomer } from '../models/customer.models';
import { log } from 'console';
import { MarketplaceService } from '../../marketplace/services/marketplace.service';
import {
  Marketplace,
  MarketplaceApiResponse,
} from '../../marketplace/models/marketplace.models';
import { FIRST_INDEX } from 'src/app/utils/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './customer-rating.component.html',
  styleUrls: ['./customer-rating.component.scss'],
})
export class CustomerRatingComponent implements OnChanges {
  @Input() pieOptions: unknown;
  @Input() filterArr: string[];
  public colors = pieChartColorsCustomerRating;
  params: any;
  constructor(
    private customerService: CustomerService,
    private _marketPlaceServices: MarketplaceService,
    private route: ActivatedRoute
  ) {}
  pieData: ChartData;
  totalReturn: string = '0';
  stars = 'stars';
  routerLink = 'total-orders';
  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };
  ratingByCustomer: {
    displayText: string;
    value: number;
    percentage: number;
  }[] = [];
  destroy$ = new Subject();
  reversedObject: { displayText: string; value: number; percentage: number }[] =
    [];
  countryId: Number | null;
  // dropdown
  channel: Marketplace[];
  selectedChannel: Marketplace;

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr']?.currentValue && this.filterArr[1]) {
      this.filterArr = changes['filterArr'].currentValue;
      this.route.queryParamMap
      .pipe(
        tap(params => {
          this.countryId =
            Number(params.get('countryId')) === 0
              ? null
              : Number(params.get('countryId'));
          this.getChannels();
          this.getRatingByChannel();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    }
  }

  getRatingByChannel() {
    this.customerService
      .getRatingByChannel(this.filterArr, this.selectedChannel.id)
      .pipe(
        tap((result: RatingByChannelResponse) => {
          const { ratingByChannel: data } = result;
          this.initTotalOrderChart(data);
          this.ratingByCustomer = data;
          // this.onChangeCountry();
          console.log(data);
        })
      )
      .subscribe();
    this.queryParams = {
      fDate: this.filterArr[0],
      tDate: this.filterArr[1],
    };
  }

  initTotalOrderChart(result: BaseChart[]) {
    let totalArr: number[] = [];
    let labelArr: string[] = [];

    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(`${item.displayText} ${this.stars}`);
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

  getChannels(): void {
    this._marketPlaceServices
      .getMarketPlaces(this.countryId)
      .pipe(
        tap((res: MarketplaceApiResponse) => {
          const { marketPlaces: data } = res;
          this.channel = [...data];
          this.selectedChannel = this.channel[FIRST_INDEX];
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  handleChannelChange() {
    this.getRatingByChannel();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
