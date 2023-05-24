import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements OnInit {
  @Input() dataChart: any;
  @Input() basicOptions!: ChartOptions;
  @Input() productName!: string;

  constructor() { }

  ngOnInit() {
  }

}
