import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  pieChartColors,
  pieChartColorsCustomer,
} from '../../share/oms-chart/oms-chart.component';
import { HIGH_THRESHOLD, LOW_THRESHOLD } from '../constants/customer.constants';
import { BaseChart, LoyaltyByApiResponse } from '../interfaces/customer.models';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-loyalty',
  templateUrl: './customer-loyalty.component.html',
  styleUrls: ['./customer-loyalty.component.scss'],
})
export class CustomerLoyaltyComponent {
  @Input() pieOptions: unknown;

  @Input() filterArr: string[];

  private readonly customerService = inject(CustomerService);
  constructor(private route: ActivatedRoute) {}
  countryId: Number | null;
  pieData: ChartData;
  lowLoyalty = 'Low loyalty';
  normalLoyalty = 'Normal loyalty';
  highLoyalty = 'High loyalty';
  totalReturn: string = '0';

  routerLink = 'total-orders';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  destroy$ = new Subject();

  ngOnInit() {}

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
            this.getCustomerLoyalty();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  getCustomerLoyalty() {
    this.customerService
      .getLoyalty(this.filterArr, this.countryId)
      .pipe(
        tap((result: LoyaltyByApiResponse) => {
          const { customerLoyalty: data } = result;
          this.initTotalOrderChart(data);
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
      item.displayText === this.lowLoyalty &&
        labelArr.push(`>0 order: ${item.value.toFixed(1)}%`);
      item.displayText === this.normalLoyalty &&
        labelArr.push(`>${LOW_THRESHOLD} order: ${item.value.toFixed(1)}%`);
      item.displayText === this.highLoyalty &&
        labelArr.push(`>${HIGH_THRESHOLD} order: ${item.value.toFixed(1)}%`);
    });
    this.pieData = {
      labels: labelArr,
      datasets: [
        {
          data: totalArr,
          backgroundColor: pieChartColorsCustomer,
          hoverBackgroundColor: pieChartColors,
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
