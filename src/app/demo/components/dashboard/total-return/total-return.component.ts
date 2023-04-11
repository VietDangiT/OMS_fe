import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dashboard-total-return',
  templateUrl: './total-return.component.html',
  styleUrls: ['./total-return.component.scss'],
})
export class TotalReturnComponent {
  @Input() pieOptions: any;
  @Input() filterArr: string[];
  pieData: ChartData;
  totalReturn: string = '0';
  
  constructor(private dashboardService: DashboardService){}

  ngOnChanges(changes: SimpleChanges){
    this.dashboardService.getTotalReturn(changes['filterArr'].currentValue).subscribe((result: any) => {      
      this.initTotalReturnChart(result);
    }); 
  }

  initTotalReturnChart(result: any){
    var labelArr: string[] = [];
    var dataArr : number[] = [];
    var total : number = 0;
    result.map((item:any)=>{
      labelArr.push(`${item.value.toFixed(0)}% ${item.text}`);
      dataArr.push(item.numberOfReturn);
      total += item.numberOfReturn;
    });
    this.totalReturn = total.toLocaleString('en-US');
    this.pieData = {
      labels: labelArr,
      datasets: [
        {
          data: dataArr,
          backgroundColor: [environment.primaryColor, environment.secondaryColor, environment.thirdColor],
          hoverBackgroundColor: [environment.primaryColor, environment.secondaryColor, environment.thirdColor],
        },
      ],
    };
  }
}
