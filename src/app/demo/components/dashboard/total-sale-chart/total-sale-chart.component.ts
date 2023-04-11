import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';
import { BaseChart } from '../interfaces/base-chart';

@Component({
  selector: 'dashboard-total-sale-chart',
  templateUrl: './total-sale-chart.component.html',
  styleUrls: ['./total-sale-chart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalsalechartComponent {
  @Input() option: ChartOptions;
  @Input() filterArr: string[];
  
  totalSaleData: ChartData;
  totalSale: string;
  
  constructor(private dashboardService: DashboardService){
  }
  
  ngOnChanges(changes: SimpleChanges){
    this.dashboardService.getTotalSale(changes['filterArr'].currentValue).subscribe((result: any) =>{
      this.initTotalSaleChart(result);
    });
  }

  initTotalSaleChart(result: any){
    var sale: number = 0;
    var totalArr: number[] = [];
    var labelArr: string[] = [];
    
    result.map((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.date).toLocaleDateString());
      sale += item.value;
    });
    
    this.totalSale = sale.toLocaleString('en-US');
    this.totalSaleData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Total Sales',
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
