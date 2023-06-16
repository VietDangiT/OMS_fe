import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { DateFilterKey } from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import {
  barBaseChartOptions,
  baseChartOptions,
} from '../../share/oms-chart/oms-chart.component';
import { totalSalesTableHeader } from './constants/total-sales.constants';
import { TotalSalesTableDTO } from './models/total-sales.models';
import { TotalSalesService } from './services/total-sales.service';

@Component({
  selector: 'oms-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss'],
})
export class TotalSalesComponent {
  private totalSalesService = inject(TotalSalesService);

  private helperService = inject(HelperService);

  private router = inject(ActivatedRoute);

  baseChartOptions = baseChartOptions;

  barChartOptions = barBaseChartOptions;

  saleBoxTitle = 'sales';

  avgOrderSaleBoxTitle = 'avg. order sales';

  returnBoxTitle = 'return';

  dateRange = this.helperService.defaultDateRange;

  pageNumber = 1;

  totalSales = 0;

  totalSalesPercent = 0;

  avgSales = 0;

  avgSalesPercent = 0;

  totalReturn = 0;

  totalReturnPercent = 0;

  revenueData: ChartData;

  overviewData: ChartData = {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        label: 'Orders on Swiggy',
        data: [66, 49, 81, 71, 26, 65, 60],
        backgroundColor: environment.primaryColor,
      },
      {
        label: 'Orders on Zomato',
        data: [56, 69, 89, 61, 36, 75, 50],
        backgroundColor: environment.secondaryColor,
      },
    ],
  };

  tableData: OmsTable<TotalSalesTableDTO> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: totalSalesTableHeader,
      body: [],
    },
  };

  destroy$ = new Subject();

  ngOnInit(): void {
    this.router.queryParams
      .pipe(
        tap(params => {
          if (params['fDate']) {
            this.dateRange = [params['fDate'], params['tDate']];
          }

          this.getComponentData();
        })
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getTotalSalesTable(this.pageNumber);

    this.getTotalSales();

    this.getReturn();
  }

  getTotalSalesTable(page: number) {
    this.totalSalesService
      .getTotalSalesTable(
        this.dateRange[0],
        this.dateRange[1],
        page,
        tableConfig.pageLimit
      )
      .pipe(
        tap(res => {
          const { detailTotalSales } = res;

          const { paging, data } = detailTotalSales;

          const updatedData = data.map(d => {
            return { ...d, date: new Date(d.date).toLocaleDateString() };
          });

          this.tableData = {
            page: paging.currentPage,
            first: paging.first,
            rows: tableConfig.pageLimit,
            pageCount: paging.totalPages,
            totalRecord: paging.totalCount,
            data: {
              header: totalSalesTableHeader,
              body: updatedData,
            },
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getTotalSales() {
    this.totalSalesService
      .getTotalSales(this.dateRange[0], this.dateRange[1])
      .pipe(
        tap(res => {
          const { totalSales: data } = res;

          const { compareData, selectedData } = data[0];

          if (selectedData) {
            let totalArr: number[] = [];
            let labelArr: string[] = [];

            let totalSales = 0;
            let totalSalesCompareData = 0;

            compareData.forEach(i => {
              totalSalesCompareData += i.value;
            });

            selectedData.forEach(i => {
              totalSales += i.value;

              totalArr.push(i.value);
              labelArr.push(new Date(i.date).toLocaleDateString('en-EN'));
            });

            this.totalSales = totalSales;
            this.totalSalesPercent = totalSales / totalSalesCompareData;

            let avgSalesCompareData =
              totalSalesCompareData / compareData.length;

            this.avgSales = totalSales / selectedData.length;
            this.avgSalesPercent = this.avgSales / avgSalesCompareData;

            this.revenueData = {
              labels: labelArr,
              datasets: [
                {
                  data: totalArr,
                  borderColor: environment.primaryColor,
                  fill: false,
                },
              ],
            };
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getReturn() {
    this.totalSalesService
      .getReturn(this.dateRange[0], this.dateRange[1])
      .pipe(
        tap(res => {
          const { return: data } = res;

          const { compareData, selectedData } = data[0];

          if (selectedData) {
            let totalReturn = 0;
            let totalReturnCompareData = 0;

            compareData.forEach(i => {
              totalReturnCompareData += i.value;
            });

            selectedData.forEach(i => {
              totalReturn += i.value;
            });

            this.totalReturnPercent = totalReturn / totalReturnCompareData;
            this.totalReturn = totalReturn;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  dateFilterChanged(dates: Date[]): void {
    if (dates[1] != null) {
      this.dateRange = dates;
      this.getComponentData();
    }
  }

  filterChanged(filter: DateFilterKey): void {
    const dateFilterValues = this.helperService.dateFilterValues;

    this.dateRange = dateFilterValues[filter];

    this.getComponentData();
  }

  onPageChange(e: PageChangeEvent): void {
    this.getTotalSalesTable(e.page + 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
