import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';

import { UIChart } from 'primeng/chart';

@Component({
  selector: 'oms-chart',
  templateUrl: './oms-chart.component.html',
  styleUrls: ['./oms-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OMSChartComponent implements OnChanges {
  @ViewChild('chart') omsChart: UIChart;

  @Input() type: ChartType = 'line';
  @Input() data: ChartData;
  @Input() options: ChartOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      // update this.data here
      
      this.data = changes['data'].currentValue;
      // then chart is getting updated
      setTimeout(() => {
        this.omsChart?.refresh();
      }, 100);
    }
  }
}
