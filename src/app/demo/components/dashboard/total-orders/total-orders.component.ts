import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { dateOptions } from 'src/app/demo/constants/date.constants';
import { tableConfig } from 'src/app/demo/constants/table.config';
import {
  DateFilterKey,
  DropdownChangeEvent,
} from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Marketplace } from '../../marketplace/models/marketplace.models';
import { MarketplaceService } from '../../marketplace/services/marketplace.service';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import {
  barBaseChartOptions,
  barHorizontalBaseChartOptions,
  baseChartOptions,
} from '../../share/oms-chart/oms-chart.component';
import {
  BaseChart,
  TotalOrderApiResponse,
} from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';
import {
  LIMIT_OF_PRODUCT_SELECTION,
  NUMBER_OF_PRODUCT,
  totalOrdersTableHeader,
} from './constants/total-orders.constants';
import { OrderParams, TotalOrder } from './models/total-orders.models';
import { TotalOrdersService } from './services/total-orders.service';

@Component({
  selector: 'oms-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalOrdersComponent implements OnInit {
  @HostBinding('class') hostClass = 'oms-total-orders';

  private readonly service = inject(TotalOrdersService);

  private readonly dashboardService = inject(DashboardService);

  private readonly helperService = inject(HelperService);

  private readonly router = inject(ActivatedRoute);

  private readonly marketplaceService = inject(MarketplaceService);

  baseChartOptions = baseChartOptions;

  barHorizontalBaseChartOptions = barHorizontalBaseChartOptions;

  barChartOptions = barBaseChartOptions;

  dateRange = this.helperService.defaultDateRange;

  marketplaces: Marketplace[];

  selectedMarketplace: Marketplace;

  selectedNumber = NUMBER_OF_PRODUCT;

  numbers = Array.from({ length: LIMIT_OF_PRODUCT_SELECTION }, (_, i) => i + 1);

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

  orderByChannel: ChartData = {
    labels: [],
    datasets: [],
  };

  orderSummary: BaseChart[] = [
    {
      displayText: '',
      value: 0,
      percentage: 0,
      date: '',
      id: 0,
      text: '',
    },
    {
      displayText: '',
      value: 0,
      percentage: 0,
      date: '',
      id: 0,
      text: '',
    },
    {
      displayText: '',
      value: 0,
      percentage: 0,
      date: '',
      id: 0,
      text: '',
    },
  ];

  params: Partial<OrderParams> = {
    channelId: 1,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  avgPricePerOrder: ChartData = {
    datasets: [],
    labels: [],
  };

  topSoldProducts: ChartData = {
    datasets: [],
    labels: [],
  };

  destroy$ = new Subject();

  ngOnInit(): void {
    this.router.queryParams
      .pipe(
        tap(params => {
          if (params['fDate']) {
            this.dateFilterChanged([params['fDate'], params['tDate']]);
          }

          this.getComponentData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.getChannels();
  }

  getComponentData(): void {
    this.getOrderSummary();

    this.getOrderTable();

    this.getTotalOrder();

    this.getOrderByChannel();

    this.getAvgPricePerOrder();

    this.getTopSoldProduct();
  }

  getChannels(): void {
    this.marketplaceService
      .getMarketPlaces(null)
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

  getOrderSummary(): void {
    this.service
      .getOrderSummary(this.dateRange)
      .pipe(
        tap(res => {
          this.orderSummary = res.totalOrderSummary;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getOrderByChannel(): void {
    this.service
      .getOrderByChannel(this.params)
      .pipe(
        tap(res => {
          const { totalOrderByChannel: data } = res;

          this.orderByChannel = this.helperService.setupBasicChartData(
            data,
            this.dateRange,
            false
          );
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
              date: new Date(o.date).toLocaleDateString('en-EN', dateOptions),
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getTotalOrder(): void {
    this.dashboardService
      .getTotalOrders(this.dateRange)
      .pipe(
        tap((result: TotalOrderApiResponse) => {
          const { totalOrdersBy: totalOrders } = result;

          this.overviewData = this.helperService.setupBasicChartData(
            totalOrders,
            this.dateRange,
            false,
            $localize`Total Orders`
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getAvgPricePerOrder(): void {
    this.service
      .getAvgPricePerOrder(this.params)
      .pipe(
        tap(res => {
          const { averagePricePerOrder: data } = res;

          this.avgPricePerOrder = this.helperService.setupBasicChartData(
            data,
            this.dateRange,
            false
          );
        })
      )
      .subscribe();
  }

  getTopSoldProduct(): void {
    this.service
      .getTopSoldProducts(this.params, this.selectedNumber)
      .pipe(
        tap(res => {
          const { topSoldProduct: data } = res;

          this.topSoldProducts = this.helperService.setupBasicChartData(
            data,
            this.dateRange,
            true
          );
        })
      )
      .subscribe();
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

    this.getOrderTable();
  }

  onSelectedChannel(e: DropdownChangeEvent): void {
    this.handleParams('channelId', e.value.id);

    this.getOrderByChannel();

    this.getOrderTable();

    this.getAvgPricePerOrder();

    this.getTopSoldProduct();
  }

  onSelectedNumber(): void {
    this.getTopSoldProduct();
  }

  handleParams(
    key: keyof Partial<OrderParams>,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
