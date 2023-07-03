import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HelperService } from '../../service/helper.service';
import {
  baseChartOptions,
  colorObj,
} from '../share/oms-chart/oms-chart.component';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  pieOptions: any;

  chartOptions = baseChartOptions;

  subscription!: Subscription;

  filterArr = this.helperSerivce.defaultDateRange.map(d =>
    d.toLocaleDateString('en-EN')
  );

  constructor(
    public layoutService: LayoutService,
    private helperSerivce: HelperService
  ) {}

  ngOnInit() {
    this.initChartOption();
  }

  initChartOption() {
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
            color: colorObj['primary'],
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
