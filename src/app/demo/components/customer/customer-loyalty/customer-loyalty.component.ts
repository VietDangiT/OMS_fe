import { Component, OnInit,Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-customer-loyalty',
  templateUrl: './customer-loyalty.component.html',
  styleUrls: ['./customer-loyalty.component.scss']
})
export class CustomerLoyaltyComponent implements OnInit {
  @Input() pieData: ChartData;
  @Input() pieOptions: any;
  constructor() { }

  ngOnInit() {
  }

}
