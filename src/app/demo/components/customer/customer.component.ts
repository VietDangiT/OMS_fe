import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../service/customer.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HelperService } from '../../service/helper.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './customer.component.html',
})

export class CustomerComponent implements OnInit , OnDestroy{
  currentDate = new Date(Date.now());
  previousDate = this.helperSerivce.addDays(this.currentDate, -7);
  pieOptions: any;
  chartOptions: ChartOptions;
  subscription!: Subscription;

  //default filter value - 7 days from currentDate
  filterArr: string[] = [
    this.previousDate.toLocaleDateString('en-US'),
    this.currentDate.toLocaleDateString('en-US'),
  ];

  constructor(
    public layoutService: LayoutService,
    private helperSerivce: HelperService
  ) {}

  ngOnInit() {
    this.initChartOption();
  }

  initChartOption() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,

      plugins: {
        legend: {
          display: false,
        },
      },
    };
    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: false,

      cutout: 75,
      plugins: {
        legend: {
          position: 'bottom',
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

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.filterArr = dateRange.map((date: Date) => {
        return date.toLocaleDateString('en-EN');
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }




}
