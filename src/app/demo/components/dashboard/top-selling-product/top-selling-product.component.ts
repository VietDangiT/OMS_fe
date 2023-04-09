import { Component, Input, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';

@Component({
  selector: 'dashboard-top-selling-product',
  templateUrl: './top-selling-product.component.html',
  styleUrls: ['./top-selling-product.component.css']
})
export class TopSellingProductComponent {
  products: any;
  @Input() filterArr : string[];
  constructor(private dashboardService: DashboardService){}

  ngOnChanges(changes: SimpleChanges){    
    this.filterArr = changes['filterArr'].currentValue;
    this.dashboardService.getTopSellingProducts(this.filterArr).subscribe((result: any) => {
      this.products  = result;
    })
  }
}
