import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../service/customer.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HelperService } from '../../service/helper.service';
import { Subscription } from 'rxjs';
import { baseChartOptions, pieChartWithLegend } from '../share/oms-chart/oms-chart.component';

@Component({
  templateUrl: './customer.component.html',
})

export class CustomerComponent implements OnDestroy{
  currentDate = new Date(Date.now());
  previousDate = this.helperSerivce.addDays(this.currentDate, -7);
  pieOptions = pieChartWithLegend;
  chartOptions= baseChartOptions;
  subscription!: Subscription;

  //default filter value - 7 days from currentDate
  filterArr: string[] = this.helperSerivce.defaultDateRange.map(d => d.toLocaleDateString());

  constructor(
    public layoutService: LayoutService,
    private helperSerivce: HelperService
  ) {}

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.filterArr = dateRange.map(d => d.toLocaleDateString());
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
