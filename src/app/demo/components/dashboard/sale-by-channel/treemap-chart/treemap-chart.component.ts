import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js';
import { color as colorLib } from 'chart.js/helpers';
import {
  TreemapController,
  TreemapElement,
  TreemapScriptableContext,
} from 'chartjs-chart-treemap';
import { OMSChartComponent } from '../../../share/oms-chart/oms-chart.component';

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreemapChartComponent  {
  chart: any;
  @Input() data: any;
  @Input() dataOptions: any;

  @ViewChild('ctx', { static: true }) private ctx;

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
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
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
    return colorLib(color).alpha(alpha).rgbString();
  }
}
