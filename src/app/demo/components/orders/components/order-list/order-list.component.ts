import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import {
  orderHeaderTable,
  orderLabelItems,
} from '../../constants/orders.constants';
import { Order, OrderParams } from '../../models/orders.models';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'oms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent {
  labelItems: MenuItem[] = orderLabelItems;

  activeItem: MenuItem = this.labelItems[0];

  dateRange = this.helperService.defaultDateRange;

  dateFilterValue: string[];

  marketPlaceId = 0;

  gapPageNumber = 1;

  orderParams: OrderParams = {
    channelId: this.marketPlaceId,
    fromDate: this.dateRange[0],
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: '',
    toDate: this.dateRange[1],
  };

  tableData: OmsTable<Order> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: orderHeaderTable,
      body: [],
    },
  };

  destroy$ = new Subject();

  constructor(
    private ordersService: OrdersService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.marketPlaceId = Number(params.get('marketPlaceId'));

          this.orderParams = {
            ...this.orderParams,
            channelId: this.marketPlaceId,
          };

          this.getOrderTable();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getOrderTable(): void {
    this.ordersService
      .getOrders(this.orderParams)
      .pipe(
        tap(res => {
          const { orders } = res;

          this.tableData = {
            data: {
              header: [...this.tableData.data.header],
              body: [...orders.data],
            },
            first: orders.first,
            page: orders.page,
            pageCount: orders.pageCount,
            rows: orders.rows,
            totalRecord: orders.totalRecord,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  dateFilterChange(dates: Date[]): void {
    if (dates[1] !== null) {
      this.handleOrderParams('fromDate', dates[0]);

      this.handleOrderParams('toDate', dates[1]);

      this.getOrderTable();
    }
  }

  searchValue(search: string): void {
    this.handleOrderParams('keyword', search);

    this.getOrderTable();
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;

    this.handleOrderParams('status', this.activeItem.label!);

    this.getOrderTable();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleOrderParams('page', e.page + this.gapPageNumber);

    this.getOrderTable();
  }

  handleOrderParams(
    key: keyof OrderParams,
    value: string | number | Date
  ): void {
    this.orderParams = {
      ...this.orderParams,
      [key]: value,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
