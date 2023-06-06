import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../../share/model/oms-table';

@Component({
  selector: 'app-customer-allcustomer',
  templateUrl: './customer-allcustomer.component.html',
  styleUrls: ['./customer-allcustomer.component.css']
})
export class CustomerAllcustomerComponent implements OnInit {
  table: OmsTable= {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        'Customer Name',
        'Address',
        'Total Order',
        'Total Spend',
        'Phone Number',
        'Last Order',
        'Type Customer',
        'Actions'
      ],
      body: [
        {name:"Trần Quân",
        address: "HCM",
        totalspend : "12313",
        totalorder:"1231311",
        phone:"0397181527",
        lastorder:"13/5/2022",
        type:"Tran Quan"},
        {name:"Trần Quân",
        address: "HCM",
        totalspend : "12313",
        totalorder:"1231311",
        phone:"0397181527",
        lastorder:"13/5/2022",
        type:"Tran Quan"},
        {name:"Trần Quân",
        address: "HCM",
        totalspend : "12313",
        totalorder:"1231311",
        phone:"0397181527",
        lastorder:"13/5/2022",
        type:"Tran Quan"},
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
  constructor() { }

  ngOnInit() {

}

onActiveItemChange(event: any){
    this.activeItem = event;
    console.log(event);
  }

}
