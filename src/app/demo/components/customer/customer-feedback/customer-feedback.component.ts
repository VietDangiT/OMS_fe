import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CustomerService } from '../services/customer.service';
import { BaseChart, FeedbackByCustomerResponse } from '../interfaces/customer.models';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements OnChanges {
  @Input() option: ChartOptions;
  @Input() filterArr: string[];

  private readonly customerService = inject(CustomerService);

  feedBackChartData: ChartData;
  totalReturn: string = '0';
  routerLink = 'total-orders';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr']?.currentValue && this.filterArr[1]) {
      this.filterArr = changes['filterArr'].currentValue;
      this.customerService
        .getFeedbackByCustomer(this.filterArr)
        .pipe(
          tap((result:FeedbackByCustomerResponse) => {
            const { feedback: data } = result;
            this.initFeedBackChart(data)
            console.log(data)
          })
        )
        .subscribe();
      this.queryParams = {
        fDate: this.filterArr[0],
        tDate: this.filterArr[1],
      };
    }
  }

initFeedBackChart(result: BaseChart[]) {
    let totalArr: number[] = [];
    let labelArr: string[] = [];
    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.displayText).toLocaleDateString());
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
        },
      ],
    };
  }


}
