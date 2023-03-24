import { Component, ViewEncapsulation } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCatalogComponent {
  chart: any;
  basicOptions!: ChartOptions;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Total Sale',
          backgroundColor: '#213969',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
    };
  }
}
