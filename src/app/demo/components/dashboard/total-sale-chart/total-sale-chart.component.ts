import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'dashboard-total-sale-chart',
  templateUrl: './total-sale-chart.component.html',
  styleUrls: ['./total-sale-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TotalsalechartComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() data: any;
  @Input() option!: ChartOptions;
  @Input() totalSale: any;
}
