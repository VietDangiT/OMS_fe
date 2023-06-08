import { Component, OnInit, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import {
  DateFilterKey,
  PagingParams,
} from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import { baseChartOptions } from '../../share/oms-chart/oms-chart.component';
import {
  BaseChart,
  TotalOrderApiResponse,
} from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';
import { totalOrdersTableHeader } from './constants/total-orders.constants';
import { TotalOrder } from './models/total-orders.models';
import { TotalOrdersService } from './services/total-orders.service';

@Component({
  selector: 'oms-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss'],
})
export class TotalOrdersComponent implements OnInit {
  private readonly service = inject(TotalOrdersService);

  private readonly dashboardService = inject(DashboardService);

  private readonly helperService = inject(HelperService);

  baseChartOptions = baseChartOptions;

  dateRange = this.helperService.defaultDateRage;

  tableData: OmsTable<TotalOrder> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: totalOrdersTableHeader,
      body: [],
    },
  };

  overviewData: ChartData = {
    labels: [],
    datasets: [],
  };

  orderSummary: BaseChart[] = [];

  params: Partial<PagingParams> = {
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  ngOnInit(): void {
    this.getComponentData();
  }

  getComponentData(): void {
    console.log(this.params);

    this.getOrderSummary();

    this.getOrderTable();

    this.getTotalOrder();
  }

  getOrderSummary(): void {
    this.service
      .getOrderSummary(this.dateRange)
      .pipe(
        tap(res => {
          this.orderSummary = res.totalOrderSummary;
        })
      )
      .subscribe();
  }

  getOrderTable(): void {
    this.service
      .getOrderTable(this.params)
      .pipe(
        tap(result => {
          const { totalOrderByStatus: res } = result;

          const { first, page, pageCount, rows, totalRecord } = res;

          // Map to convert date variable in res.arr
          const updatedData = res.data.map(o => {
            return {
              ...o,
              date: new Date(o.date).toLocaleDateString('en-EN'),
            };
          });

          this.tableData = {
            first,
            page,
            pageCount,
            rows,
            totalRecord,
            data: {
              header: [...this.tableData.data.header],
              body: [...updatedData],
            },
          };
        })
      )
      .subscribe();
  }

  getTotalOrder(): void {
    this.dashboardService
      .getTotalOrders(this.dateRange)
      .pipe(
        tap((result: TotalOrderApiResponse) => {
          const { totalOrdersBy: totalOrders } = result;

          this.initTotalOrderChart(totalOrders);
        })
      )
      .subscribe();
  }

  initTotalOrderChart(result: BaseChart[]): void {
    var totalArr: number[] = [];

    var labelArr: string[] = [];

    result.map((item: BaseChart) => {
      totalArr.push(item.value);

      labelArr.push(new Date(item.text).toLocaleDateString());
    });

    this.overviewData = {
      labels: labelArr,
      datasets: [
        {
          label: $localize`Total Orders`,
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
        },
      ],
    };
  }

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] !== null) {
      this.dateRange = dateRange;

      this.handleParams('fromDate', this.dateRange[0]);

      this.handleParams('toDate', this.dateRange[1]);

      this.getComponentData();
    }
  }

  filterChanged(filter: DateFilterKey): void {
    const dateFilterValues = this.helperService.dateFilterValues;

    this.dateFilterChanged(dateFilterValues[filter]);
  }

  onPageChange(e: PagingInfo): void {
    this.handleParams('page', e.page + tableConfig.gapPageNumber);

    this.getComponentData();
  }

  handleParams(
    key: keyof Partial<PagingParams>,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }
}
