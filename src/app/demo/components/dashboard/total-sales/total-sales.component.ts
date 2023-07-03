import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import {
  DateFilterKey,
  DropdownChangeEvent,
} from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Marketplace } from '../../marketplace/models/marketplace.models';
import { MarketplaceService } from '../../marketplace/services/marketplace.service';
import { OmsTable } from '../../share/model/oms-table';
import {
  barBaseChartOptions,
  baseChartOptions,
} from '../../share/oms-chart/oms-chart.component';
import { Statistic } from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';
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

  private marketplaceService = inject(MarketplaceService);

  private dashboardService = inject(DashboardService);

  baseChartOptions = baseChartOptions;

  barChartOptions = barBaseChartOptions;

  selectedMarketplace: Marketplace;

  marketplaces: Marketplace[] = [];

  dateRange = this.helperService.defaultDateRange;

  salesStatistic: Statistic[] = [];

  pageNumber = 1;

  revenueData: ChartData;

  channelId = 1;

  overviewData: ChartData = {
    labels: [],
    datasets: [],
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
    this.getChannels();

    this.router.queryParams
      .pipe(
        tap(params => {
          if (params['fDate']) {
            this.dateRange = [params['fDate'], params['tDate']];
          }

          this.getComponentData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getTotalSalesTable(this.pageNumber);

    this.getTotalSales();

    this.getSalesByChannel();

    this.getSalesStatistic();
  }

  getSalesByChannel(): void {
    this.dashboardService
      .getTotalSaleByChannel(this.dateRange, this.channelId)
      .pipe(
        tap(res => {
          const { totalSaleByChannel: data } = res;

          this.overviewData = this.helperService.setupBasicChartData(
            data,
            this.dateRange,
            true,
            $localize`Sales by channel`
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getChannels(): void {
    this.marketplaceService
      .getMarketPlaces()
      .pipe(
        tap(res => {
          const { marketPlaces: data } = res;

          this.marketplaces = data;

          this.selectedMarketplace = data[0];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
            return {
              ...d,
              date: new Date(d.date).toLocaleDateString(),
            };
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
      .getRevenue(this.dateRange[0], this.dateRange[1])
      .pipe(
        tap(res => {
          const { revenue: data } = res;

          this.revenueData = this.helperService.setupBasicChartData(
            data,
            this.dateRange,
            false
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getSalesStatistic(): void {
    this.totalSalesService
      .getSaleStatistic(this.dateRange[0], this.dateRange[1])
      .pipe(
        tap(res => {
          const { totalSalesStatistic: data } = res;

          this.salesStatistic = data;
        })
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

  onSelectedChannel(e: DropdownChangeEvent): void {
    this.channelId = e.value.id;

    this.getSalesByChannel();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
