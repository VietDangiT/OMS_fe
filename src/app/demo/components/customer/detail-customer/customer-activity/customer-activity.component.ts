import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OmsTable } from '../../../share/model/oms-table';

@Component({
  selector: 'app-customer-activity',
  templateUrl: './customer-activity.component.html',
  styleUrls: ['./customer-activity.component.scss']
})
export class CustomerActivityComponent implements OnInit {
  @Output('onClose') onClose: EventEmitter<boolean> = new EventEmitter();
  tableData: OmsTable<any> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
      ],
      body: [
      ],
    },
  };



  constructor() { }

  ngOnInit() {
  }
  closeModal() {
    this.onClose.emit();
  }
}
