import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseChart, CustomerTopProduct, TopProductByCustomerResponse } from '../interfaces/customer.models';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-topproduct',
  templateUrl: './customer-topproduct.component.html',
  styleUrls: ['./customer-topproduct.component.scss']
})
export class CustomerTopproductComponent  {

  products: CustomerTopProduct[];
  @Input() filterArr: string[];

  constructor(private customerService: CustomerService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.filterArr = changes['filterArr'].currentValue;

    this.customerService
      .getCustomerByTopProduct(this.filterArr)
      .subscribe((result: TopProductByCustomerResponse) => {
        const { topSaleProductEachChannel: products } = result;
        this.products = products;
      });
  }

}
