import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './customer-rating.component.html',
  styleUrls: ['./customer-rating.component.scss']
})
export class CustomerRatingComponent implements OnInit {
  @Input() pieData: ChartData;
  @Input() pieOptions: any;
  @Input() cities:any;
  @Input() selectedCity: any;
  constructor() { }

  ngOnInit() {
  }

}
