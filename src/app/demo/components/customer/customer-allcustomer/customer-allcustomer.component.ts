import { Component, HostBinding, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../../share/model/oms-table';

@Component({
  selector: 'app-customer-allcustomer',
  templateUrl: './customer-allcustomer.component.html',
  styleUrls: ['./customer-allcustomer.component.scss'],
})
export class CustomerAllcustomerComponent implements OnInit {
  @HostBinding('class') hostClass = 'app-customer-allcustomer';

  table: OmsTable<any> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [ ],
      body: [
       
      ],
    },
  };
  items: MenuItem[] = [
    { label: 'All', id: '0', badge: '1123' },
    { label: 'Active', id: '1', badge: '1243' },
    { label: 'Inactive', id: '2', badge: '1' },
  ];
  activeItem: MenuItem = this.items[0];
  countryId: string | number;
  constructor() {}

  ngOnInit() {}

  onActiveItemChange(event: any) {
    this.activeItem = event;
  }

  // popup show details

  modalVisible = false;

  handleAction(e: Event): void {
    e.stopPropagation();
  }

  handleOrderDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }

  handleCloseModal() {
    this.modalVisible = false;
  }
}
