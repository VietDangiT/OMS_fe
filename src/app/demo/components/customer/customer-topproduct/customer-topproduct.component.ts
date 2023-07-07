import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  BaseChart,
  CustomerTopProduct,
  TopProductByCustomerResponse,
} from '../interfaces/customer.models';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-customer-topproduct',
  templateUrl: './customer-topproduct.component.html',
  styleUrls: ['./customer-topproduct.component.scss'],
})
export class CustomerTopproductComponent {
  products: CustomerTopProduct[];
  @Input() filterArr: string[];
  @Input() countryId: number | null;
  constructor(private customerService: CustomerService, private route: ActivatedRoute) {}

  destroy$ = new Subject();
  ngOnChanges(changes: SimpleChanges) {
    this.filterArr = changes['filterArr'].currentValue;
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.countryId =
            Number(params.get('countryId')) === 0
              ? null
              : Number(params.get('countryId'));
          this.getTrendingProduct();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getTrendingProduct() {
    this.customerService
      .getTopProduct(this.filterArr, this.countryId)
      .subscribe((result: TopProductByCustomerResponse) => {
        const { topSaleProductEachChannel: products } = result;
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
