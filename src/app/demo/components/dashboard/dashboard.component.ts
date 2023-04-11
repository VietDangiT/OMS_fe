import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { HelperService } from '../../service/helper.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentDate = new Date(Date.now());
  previousDate = this.helperSerivce.addDays(this.currentDate, -7);
  pieOptions: any;
  chartOptions: any;
  subscription!: Subscription;

  //default filter value - 7 days from currentDate
  filterArr : string[] =[
  this.previousDate.toLocaleDateString("en-US"),
  this.currentDate.toLocaleDateString("en-US")
  ];

  constructor(public layoutService: LayoutService, private helperSerivce: HelperService) {}

  ngOnInit() {
    this.initChartOption();
  }

  initChartOption(){
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display:false,
        },
      },
    
    };
    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      cutout: 100,
      plugins: {
        legend: {
          position: 'bottom' ,
          labels: {
            boxHeight: 20,
            boxWidth: 20,
            padding: 20,
            usePointStyle: true,
            color: environment.primaryColor,
            font: {
              size: 12,
            },
          },
        },
      },
    };
  }

  dateFilterChanged(dateRange: Date[]){
    if(dateRange[1] != null){
      this.filterArr = dateRange.map((date:Date)=>{
        return date.toLocaleDateString("en-EN");
      });
    }
    return null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
