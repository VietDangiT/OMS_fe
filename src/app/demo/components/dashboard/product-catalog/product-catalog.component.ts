import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

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

  ngOnInit(): void {
  }

  
}
