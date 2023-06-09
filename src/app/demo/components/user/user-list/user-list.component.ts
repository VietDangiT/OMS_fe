import { UserService } from 'src/app/demo/service/user.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../../share/model/oms-table';
import { userHeaderTable, userLabelItems } from '../constants/user.constants';
import { User, UserParams } from '../models/user.models';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';

@Component({
  selector: 'oms-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent {
  labelItems: MenuItem[] = userLabelItems;

  activeItem: MenuItem = this.labelItems[0];

  dateRange = this._helperService.defaultDateRage;

  dateFilterValue: string[];

  role = "";

  gapPageNumber = 1;

  userParams: UserParams = {
    userRole: this.role,
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: '',
  };

  tableData: OmsTable<User> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: userHeaderTable,
      body: [],
    },
  };

  destroy$ = new Subject();

  constructor(
    private _usersService: UserService,
    private _helperService: HelperService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(
        tap(params => {
          this.role = params.get('role') ?? "";

          this.userParams = {
            ...this.userParams,
            userRole: this.role,
          };

          this.getUserTable();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getUserTable(): void {
    this._usersService
      .getUsers(this.userParams)
      .pipe(
        tap(res => {
          const { users } = res;

          this.tableData = {
            data: {
              header: [...this.tableData.data.header],
              body: [...users.data],
            },
            first: users.first,
            page: users.page,
            pageCount: users.pageCount,
            rows: users.rows,
            totalRecord: users.totalRecord,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  dateFilterChange(dates: Date[]): void {
    if (dates[1] !== null) {
      this.handleUserParams('fromDate', dates[0]);

      this.handleUserParams('toDate', dates[1]);

      this.getUserTable();
    }
  }

  searchValue(search: string): void {
    this.handleUserParams('keyword', search);

    this.getUserTable();
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;

    this.handleUserParams('status', this.activeItem.label!);

    this.getUserTable();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleUserParams('page', e.page + this.gapPageNumber);

    this.getUserTable();
  }

  handleUserParams(
    key: keyof UserParams,
    value: string | number | Date
  ): void {
    this.userParams = {
      ...this.userParams,
      [key]: value,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
