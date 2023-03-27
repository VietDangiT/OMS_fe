
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';

import { UIChart } from 'primeng/chart';

@Component({
  selector: 'share-chart',
  templateUrl: './share-chart.component.html',
  styleUrls: ['./share-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShareChartComponent extends UIChart {}
