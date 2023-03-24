import { Component, ViewEncapsulation } from '@angular/core';
import {Chart } from 'chart.js';

@Component({
    selector: 'app-product-catalog',
    templateUrl: './product-catalog.component.html',
    styleUrls: ['./product-catalog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductCatalogComponent {
  public chart: any;
 
  ngOnInit(): void {
    this.createChart();
  }
 
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: ['25% Approved', '35% Pending', '40% Unapproved'],
        datasets: [
          {
            data: [25, 35, 40],
            backgroundColor: ['#007EC6', '#7595D4', '#213969'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: true,
        radius: '50',
        plugins: {
          legend: {
            position: 'left',
            labels: {
              boxHeight: 20,
              boxWidth: 20,
              padding: 25,
              usePointStyle: true,
              font: {
                size: 11, // adjust the font size of the labels
              },
            },
          },
 
        }
 
      },
    });
  }
}
