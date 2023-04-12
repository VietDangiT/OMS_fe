import { Component, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';
import { BaseChart } from '../interfaces/interfaces';

@Component({
  selector: 'dashboard-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalOrdersComponent {
  @Input() basicOptions!: ChartOptions;
  @Input() filterArr: string[];
  
  totalOrderData: ChartData;
  totalOrder: string = '0';

  constructor(private dashboardService: DashboardService){}
  ngOnChanges(changes : SimpleChanges){
    this.dashboardService.getTotalOrder(changes['filterArr'].currentValue).subscribe((result:any) =>{
      this.initTotalOrderChart(result);
    });
  }

  initTotalOrderChart(result: any){
    var totalArr: number[] = [];
    var labelArr: string[] = [];
    var order: number = 0;
    result.map((item: BaseChart) => {          
      totalArr.push(item.value);
      labelArr.push(new Date(item.text).toLocaleDateString());
      order += item.value;
    });
    
    this.totalOrder = order.toLocaleString('en-US');
    this.totalOrderData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Total Orders',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
        },
      ],
    };
  }

}
