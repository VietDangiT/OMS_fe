
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';

import { UIChart } from 'primeng/chart';

@Component({
  selector: 'oms-chart',
  templateUrl: './oms-chart.component.html',
  styleUrls: ['./oms-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OMSChartComponent extends UIChart {}
