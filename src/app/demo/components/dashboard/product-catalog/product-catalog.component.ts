import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/demo/service/dashboard.service';

@Component({
  selector: 'dashboard-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCatalogComponent {
  @Input() dataChart: any;
  @Input() basicOptions!: ChartOptions;
  @Input() productName!: string;

  //Product Variant list
  productVariantList : any[];

  ngOnInit(): void {
  }

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getProductVariant().subscribe((productList: any)=>{
      this.productVariantList = productList;
      console.log(this.productVariantList);
    })
    
  }

  
}
