import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-customer-bychannel',
  templateUrl: './customer-bychannel.component.html',
  styleUrls: ['./customer-bychannel.component.scss']
})
export class CustomerBychannelComponent implements OnInit {
  @Input() pieData: ChartData;
  @Input() pieOptions: any;
  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

}
