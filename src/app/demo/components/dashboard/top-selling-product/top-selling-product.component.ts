import { Component, Input, SimpleChanges } from '@angular/core';
import {
  BaseChart,
  TotalSalesByProductApiResponse,
} from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-top-selling-product',
  templateUrl: './top-selling-product.component.html',
  styleUrls: ['./top-selling-product.component.css'],
})
export class TopSellingProductComponent {
  products: BaseChart[];
  @Input() filterArr: string[];

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.filterArr = changes['filterArr'].currentValue;

    this.dashboardService
      .getTotalSaleByProducts(this.filterArr)
      .subscribe((result: TotalSalesByProductApiResponse) => {
        const { totalSaleProductsBy: products } = result;

        this.products = products;
      });
  }
}
