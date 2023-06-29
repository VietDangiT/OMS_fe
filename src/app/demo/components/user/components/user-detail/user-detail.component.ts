import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { HelperService } from 'src/app/demo/service/helper.service';
import { User } from '../../../login/models/login.models';
import { Order, OrderApiResponse } from '../../../orders/models/orders.models';
import { OrdersService } from '../../../orders/services/orders.service';
import { OmsTable } from '../../../share/model/oms-table';
import { PagingInfo } from '../../../share/model/paginginfo';
import { userOrdersTableHeader } from '../../constants/user.constants';
import { UserOrderParams } from '../../models/user.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  @HostBinding('class') hostClass = 'oms-user-detail';

  userService = inject(UserService);

  orderService = inject(OrdersService);

  helperService = inject(HelperService);

  user: Partial<User> = {
    avatar: '',
    email: '',
    dob: '',
    fullAddress: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    userRole: 'USER',
    userStatus: '',
    facebook: '',
    instagram: '',
    id: 0,
  };

  params: UserOrderParams = {
    channelId: null,
    limit: tableConfig.pageLimit / 2,
    page: tableConfig.page,
    fromDate: null,
    toDate: null,
    userId: null,
  };

  tableData: OmsTable<Partial<Order>> = {
    first: 0,
    page: tableConfig.page,
    totalRecord: 0,
    pageCount: 0,
    rows: 0,
    data: {
      header: userOrdersTableHeader,
      body: [
        {
          id: 0,
          orderedAt: '',
          channelImage: '',
          channelName: ' ',
          productUnit: 0,
          price: 0,
          shippingCarrier: '',
          status: '',
        },
      ],
    },
  };

  phoneNumber = $localize`Phone Number`;

  dob = $localize`D.O.B`;

  address = $localize`Address`;

  email = $localize`Email`;

  gender = $localize`Gender`;

  editRouterLink = '/user/edit';

  ngOnInit(): void {
    this.initUser();
  }

  initUser(): void {
    this.userService
      .getUser()
      .pipe(
        switchMap(res => {
          const { userDetail: data } = res;

          this.user = this.userService.refactorUser(data);

          this.handleOrderParams('userId', this.user.id!);

          return this.orderService.getOrders(this.params);
        }),
        tap(res => {
          this.initUserOrdersTable(res);
        })
      )
      .subscribe();
  }

  initUserOrdersTable(res: OrderApiResponse) {
    const data = res.orders;

    const { data: d, first, page, pageCount, rows, totalRecord } = data;

    const updatedData = d.map(o => {
      return {
        ...o,
        channelImage: this.helperService.refactorImg(o.channelImage!),
        orderedAt: new Date(o.orderedAt!).toLocaleDateString(),
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
  }

  getUserOrders(): void {
    this.orderService
      .getOrders(this.params)
      .pipe(tap(res => this.initUserOrdersTable(res)))
      .subscribe();
  }

  onPageChange(e: PagingInfo): void {
    this.handleOrderParams('page', e.page + tableConfig.gapPageNumber);

    this.getUserOrders();
  }

  handleOrderParams(
    key: keyof UserOrderParams,
    value: string | number | Date | null
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }
}
