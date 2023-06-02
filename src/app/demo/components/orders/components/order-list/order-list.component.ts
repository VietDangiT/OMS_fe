import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { Order, OrderParams } from '../../models/orders.models';
import {
  OrdersService,
  orderHeaderTable,
  orderLabelItems,
} from '../../services/orders.service';

type key = keyof OrderParams;

@Component({
  selector: 'oms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent {
  labelItems: MenuItem[] = orderLabelItems;

  activeItem: MenuItem;

  dateRange = [this.helperService.addDays(new Date(), -7), new Date()];

  dateFilterValue: string[];

  marketPlaceId = 0;

  gapPageNumber = 1;

  pageLimit = 6;

  orderParams: OrderParams = {
    channelId: this.marketPlaceId,
    fromDate: new Date(),
    keyword: '',
    limit: this.pageLimit,
    page: 1,
    status: '',
    toDate: new Date(),
  };

  tableData: OmsTable<Order> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: orderHeaderTable,
      body: [
        {
          id: 1,
          orderedAt: '',
          channelName: '',
          totalProduct: 1,
          price: 1,
          shippingCarrier: '',
          status: '',
        },
      ],
    },
  };

  constructor(
    private ordersService: OrdersService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeItem = this.labelItems[0];

    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.marketPlaceId = Number(params.get('marketPlaceId'));

          this.orderParams = {
            ...this.orderParams,
            fromDate: this.dateRange[0],
            toDate: this.dateRange[1],
            channelId: this.marketPlaceId,
          };

          this.getOrderTable();
        })
      )
      .subscribe();
  }

  getOrderTable(): void {
    this.ordersService.getOrders(this.orderParams).subscribe(res => {
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
    });
  }

  dateFilterChange(dates: Date[]): void {
    if (dates[1] !== null) {
      this.handleOrderParams('fromDate', dates[0]);

      this.handleOrderParams('toDate', dates[1]);

      this.getOrderTable();
    }
  }

  searchValue(search: string): void {
    this.orderParams = {
      ...this.orderParams,
      keyword: search,
    };

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
}
