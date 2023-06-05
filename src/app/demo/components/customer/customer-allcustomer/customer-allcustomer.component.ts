import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-allcustomer',
  templateUrl: './customer-allcustomer.component.html',
  styleUrls: ['./customer-allcustomer.component.scss']
})
export class CustomerAllcustomerComponent implements OnInit {
  items: MenuItem[];

  activeItem: MenuItem;
  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'All', id: '0',badge:"1123" },
      { label: 'Active' , id: '1', badge:"1243"},
      { label: 'Inactive', id:'2',badge:"1"},
    ];
    this.activeItem = this.items[0];
}

onActiveItemChange(event: any){
    this.activeItem = event;
    console.log(event);
  }

}
