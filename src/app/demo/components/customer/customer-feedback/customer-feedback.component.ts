import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BaseChart,
  FeedbackByCustomerResponse,
} from '../interfaces/customer.models';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/demo/service/helper.service';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss'],
})
export class CustomerFeedbackComponent implements OnChanges {
  @Input() option: ChartOptions;
  @Input() filterArr: string[];

  private readonly customerService = inject(CustomerService);
  private readonly helperService = inject(HelperService)
  constructor(private route: ActivatedRoute) {}
  feedBackChartData: ChartData;
  totalReturn: string = '0';
  routerLink = 'total-orders';
  countryId: number | null;

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  destroy$ = new Subject();

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
          this.getCustomerFeedback();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    }
  }

  getCustomerFeedback() {
    this.customerService
      .getFeedbackByCustomer(this.filterArr, this.countryId)
      .pipe(
        tap((result: FeedbackByCustomerResponse) => {
          const { feedback: data } = result;
          this.initFeedBackChart(data);
        })
      )
      .subscribe();
    this.queryParams = {
      fDate: this.filterArr[0],
      tDate: this.filterArr[1],
    };
  }

  initFeedBackChart(result: BaseChart[]) {
    let totalArr: number[] = [];
    let labelArr: string[] = [];
    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(this.helperService.convertToDisplayDate(item.date, this.filterArr));
    });

    this.feedBackChartData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Feedback',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
          tension: 0.4,
          pointBorderWidth: 2,
          pointRadius: 0,
        },
      ],
    };
  }
}
