import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { color as colorLib } from 'chart.js/helpers';
import { TreemapController, TreemapElement, TreemapScriptableContext } from 'chartjs-chart-treemap';

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss']
})
export class TreemapChartComponent {
  chart: any;
  @ViewChild('ctx', {static: true}) private ctx;

  constructor(ctx: ElementRef) {
    this.ctx = ctx;
  }
  
  ngOnInit(): void {
    Chart.register(TreemapController, TreemapElement);
    this.CreateChart();
  }

  CreateChart() {
    this.chart = new Chart(this.ctx.nativeElement, {
      type: 'treemap',
      data: {
        labels: ['TotalSales'],
        datasets: [
          {
            label: 'Total Sales',
            data: [23, 32, 74, 43, 88, 19,44, 34, 75, 93, 44],
            backgroundColor: (ctx) => this.colorFromRaw(ctx),
            borderColor: '#000',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  
  colorFromRaw(ctx: TreemapScriptableContext) {
    if (ctx.type !== 'data') {
      return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color = '#213969';
    return colorLib(color)
      .alpha(alpha)
      .rgbString();
  }
}
