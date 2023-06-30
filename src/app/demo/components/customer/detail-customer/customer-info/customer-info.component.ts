import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  @Input() name : string;
  @Input() desc : string;
  constructor() { }

  ngOnInit() {
  }

}
