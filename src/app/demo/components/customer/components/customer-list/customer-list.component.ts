import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { CustomerLabel, ListCustomerHeader } from '../../constants/customer.constants';
import { CustomerService } from '../../services/customer.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ListCustomer, ListCustomerParams } from '../../interfaces/customer.models';
import { PagingParams } from 'src/app/demo/interface/global.model';
import { tableConfig } from 'src/app/demo/constants/table.config';

@Component({
  selector: 'oms-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  labelItems: MenuItem[] = CustomerLabel;
  activeItem: MenuItem;
  params: ListCustomerParams = {
    channelId: null,
    fromDate: null,
    toDate: null,
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    fDate : null,
    tDate :null,
  };
  tableData: OmsTable<ListCustomer> = {
    first: 0,
    page: 1,
    pageCount: 0,
    rows: 0,
    totalRecord: 0,
    data: {
      header: ListCustomerHeader,
      body: [],
    },
  };

  dateRange: Date[] = [];
  destroy$ = new Subject();

  constructor( private customerservice:CustomerService) {}

  ngOnInit(){
    this.getAllListCustomer();
  }

  getAllListCustomer(): void { 
    this.customerservice
    .getCustomerList(this.params).pipe(tap(res => {
     const {listCustomer} = res;
     console.log(listCustomer)
    this.tableData = {
      data : {
        header: [...this.tableData.data.header] ,
        body: [...listCustomer.data],
      },
      first: listCustomer.first,
      page: listCustomer.page,
      pageCount: listCustomer.pageCount,
      rows: listCustomer.rows,
      totalRecord: listCustomer.totalRecord,
 
      
    };
    console.log(this.tableData);
    }),
    takeUntil(this.destroy$)
    )
    .subscribe();
  }
  
  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;

    this.handleInventoryParams('page', tableConfig.gapPageNumber);

    this.getAllListCustomer();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleInventoryParams('page', e.page + tableConfig.gapPageNumber);

    this.getAllListCustomer();
  }

  dateFilterChange(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.handleInventoryParams('fDate', dateRange[0]);

      this.handleInventoryParams('tDate', dateRange[1]);

      this.getAllListCustomer();
    }
  }

  searchValue(search: string): void {
    if (search) {
      this.handleInventoryParams('keyword', search);

      this.getAllListCustomer();
    }
  }

  handleInventoryParams(
    key: keyof ListCustomerParams,
    value: string | number | Date | null
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
