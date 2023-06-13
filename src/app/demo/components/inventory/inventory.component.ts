import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../share/model/oms-table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class InventoryComponent implements OnInit {
  // @HostBinding('class') hostClass = 'app-inventory-card';
  modalVisible: boolean;
  items: MenuItem[] = [
    { label: 'All', id: '0', badge: '1123' },
    { label: 'Stock available', id: '1', badge: '1243' },
    { label: 'Low on stock', id: '2', badge: '1' },
    { label: 'Out of stock', id: '2', badge: '1' },
  ];
  activeItem: MenuItem = this.items[0];
  countryId: string | number;
  table: OmsTable<any>= {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        // 'Image',
        // 'SKU',
        // 'Product Name',
        // 'Available Stock',
        // 'In-process',
        // 'Sold',
        // 'Actions'
      ],
      body: [
          { image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
            sku: "HCM",
            productname : "Hạt Dẻ",
            availablestock:"12",
            inprocess:"2",
            sold:"2",
          },
          {
            image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
            sku: "HCM",
            productname : "Hạt Dẻ",
            availablestock:"12",
            inprocess:"2",
            sold:"2",
          },
          {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
        },
        {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
      },
        {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
        },
        {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
        },
        {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
        },
        {
          image:"https://th.bing.com/th/id/R.9dfccb47fa289bd328e092a7607bf078?rik=A3zqZto7RVf42A&pid=ImgRaw&r=0",
          sku: "HCM",
          productname : "Hạt Dẻ",
          availablestock:"12",
          inprocess:"2",
          sold:"2",
        },

      ],
    },
  };

  constructor() { }

  ngOnInit() {
  }
  onActiveItemChange(event: any){
    this.activeItem = event;
    console.log(event);
  }
  handleOrderDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }
}
