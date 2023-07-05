import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../services/customer.service';
import { BaseChart, CustomerByChannelResponse } from '../interfaces/customer.models';
import { tap } from 'rxjs';
import { pieChartColors, pieChartColorsCustomer } from '../../share/oms-chart/oms-chart.component';


@Component({
  selector: 'app-customer-bychannel',
  templateUrl: './customer-bychannel.component.html',
  styleUrls: ['./customer-bychannel.component.scss']
})
export class CustomerBychannelComponent implements OnChanges {
  @Input() pieOptions: unknown;
  @Input() filterArr: string[];
  public colors = pieChartColorsCustomer;
  private readonly customerService = inject(CustomerService);

  pieData: ChartData;
  totalReturn: string = '0';
  routerLink = 'total-orders';
  channelByCustomer: { displayText: string; value: number, percentage:number }[] = [];
  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };
 customerBy: number = 0;
 CustomerByTitle = "Customers By Channel";


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr']?.currentValue && this.filterArr[1]) {
      this.filterArr = changes['filterArr'].currentValue;
      this.customerService
        .getCustomerByChannel(this.filterArr)
        .pipe(
          tap((result:CustomerByChannelResponse) => {
            const { customerByChannel: data } = result;
            this.initTotalOrderChart(data);
            this.channelByCustomer = data;
            this.customerBy;
          })
        )
        .subscribe();
      this.queryParams = {
        fDate: this.filterArr[0],
        tDate: this.filterArr[1],
      };
    }
  }

  initTotalOrderChart(result: BaseChart[]) {
    let totalArr: number[] = [];
    let labelArr: string[] = [];
    let customerTotal = 0;
    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push (`${item.displayText}`);
      customerTotal += item.value;
      this.customerBy = customerTotal;
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

}
