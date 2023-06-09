import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { Customer } from '../../models/customer.models';

@Component({
  selector: 'oms-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  labelItems: MenuItem[];

  activeItem: MenuItem;

  tableData: OmsTable<Customer> = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0,
    totalRecord: 0,
    data: {
      header: [],
      body: [],
    },
  };

  dateRange = [this.helperService.addDays(new Date(), -7), new Date()];

  constructor(private helperService: HelperService) {}

  onActiveItemChange(e: MenuItem): void {}

  dateFilterChange(date: Date[]): void {}

  searchValue(val: string): void {}

  onPageChange(e: PageChangeEvent): void {}
}
