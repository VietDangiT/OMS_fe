import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Statistic } from '../../dashboard/interfaces/dashboard.models';
import { ChartData } from 'chart.js';
import { environment } from 'src/environments/environment';
import {
  barBaseChartOptions,
  pieChartColors,
  pieChartColorsCustomer,
} from '../../share/oms-chart/oms-chart.component';
import resolveConfig from 'tailwindcss/resolveConfig';
import { InventoryService } from '../services/inventory.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { SaleChannelParams, SaleChannelStatisticApiResponse } from '../interfaces/inventory.component';
import { FIRST_INDEX, SECOND_INDEX } from 'src/app/utils/utils';

const tailwindConfig = require('tailwind.config.js');
const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme['colors'];

@Component({
  selector: 'oms-sales-channel-performance',
  templateUrl: './sales-channel-performance.component.html',
  styleUrls: ['./sales-channel-performance.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SalesChannelPerformanceComponent {
  @Input() productVariantId: number;
  dateRange = this._helperService.defaultDateRange;
  destroy$ = new Subject();
  productSummary: Statistic[];
  grossProfitSummary: Statistic[];

  saleChannelParams: SaleChannelParams = {
    Id: undefined,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
  };

  overviewChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  negativeChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          colors: (context: any) => {
            const zeroLine = context.tick.value;
            const gridColor = zeroLine === 0 ? 'black' : '#ccc';
            return gridColor;
          },
        },
      },
      beginAtZero: true
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
            label: function(context: any) {
                var value = context.raw;
                return value + '%';
            }
        }
    }
    },
  };

  pieOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 75,
    plugins: {
      legend: {
        position: 'right',
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

  pieData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: pieChartColorsCustomer,
        hoverBackgroundColor: pieChartColorsCustomer,
      },
    ],
  };

  overviewData: ChartData = {
    labels: [],
    datasets: [
      {
        label: '# Sold Product',
        backgroundColor: colors.primary,
        data: [],
      },
      {
        label: 'Total Sales',
        backgroundColor: colors.secondary,
        data: [],
      },
    ],
  };

  salesGrowth: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Sale Growth',
        backgroundColor: this.handleBarColor,
        data: [],
      },
    ],
  };

  constructor(private _helperService: HelperService, private _inventoryService: InventoryService) {}

  ngOnInit(){
    this.saleChannelParams.Id = this.productVariantId;
    this.getSaleChannelStatistic();
  }

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.saleChannelParams.fromDate = dateRange[FIRST_INDEX].toLocaleDateString('en-EN');
      this.saleChannelParams.toDate = dateRange[SECOND_INDEX].toLocaleDateString('en-EN');
      this.getSaleChannelStatistic();
      // this.filterArr = dateRange.map((date: Date) => {
      //   return date.toLocaleDateString('en-EN');
      // });
    }
  }

  getSaleChannelStatistic(): void {
    if(!this.productVariantId) return;
    this._inventoryService
      .getSaleChannelStatistic(this.saleChannelParams)
      .pipe(
        tap((res: SaleChannelStatisticApiResponse) => {
          //Summary
          this.productSummary = [res.totalSaleByProductVariant, res.totalSoldProductVariant];
          this.grossProfitSummary = [res.grossProfitByProductVariant, res.grossProfitMarginByProductVariant];

          //Sale by Channel Chart
          const tmpPieData = this.pieData;
          tmpPieData.labels = [...res.saleProductByChannel.map(item => item.displayText)];
          tmpPieData.datasets[FIRST_INDEX].data = [...res.saleProductByChannel.map(item => item.percentage)];
          this.pieData = {...tmpPieData}

          //Overview Chart
          const tmpOverviewData = this.overviewData;
          tmpOverviewData.labels = res.productSaleOverview.map(item => new Date(item.date).toLocaleDateString());
          tmpOverviewData.datasets[FIRST_INDEX].data = res.productSaleOverview.map(item => item.extraValue);
          tmpOverviewData.datasets[SECOND_INDEX].data = [...res.productSaleOverview].map(item => item.value);
          this.overviewData = {...tmpOverviewData};

          //Sale Growth Chart
          const tmpSalesGrowthData = this.salesGrowth;
          tmpSalesGrowthData.labels = res.salesGrowthByProductVariant.map(item => new Date(item.date).toLocaleDateString());
          tmpSalesGrowthData.datasets[FIRST_INDEX].data = res.salesGrowthByProductVariant.map(item => item.extraValue);
          this.salesGrowth = {...tmpSalesGrowthData};
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  handleBarColor(ctx: any) {
    const standard = 0;
    const expenses = ctx.raw;
    const barColor = expenses > standard ? colors.primary : colors.errors;
    return barColor;
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
