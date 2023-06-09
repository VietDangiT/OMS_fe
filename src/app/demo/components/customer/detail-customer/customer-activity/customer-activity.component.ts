import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OmsTable } from '../../../share/model/oms-table';

@Component({
  selector: 'app-customer-activity',
  templateUrl: './customer-activity.component.html',
  styleUrls: ['./customer-activity.component.scss']
})
export class CustomerActivityComponent implements OnInit {
  @Output('onClose') onClose: EventEmitter<boolean> = new EventEmitter();
  tableData: OmsTable = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: ['Product Code', 'Product name', 'Store', 'Description','Rating'],
      body: [
        {
          code: '#00001',
          name: 'Dec 28, 2022',
          store: 'Lazada VN',
          description: '$ 1,000',
          rating: "Completed",
        },
        {
          code: '#00001',
          name: 'Dec 28, 2022',
          store: 'Lazada VN',
          description: '$ 1,000',
          rating: "Completed",
        },
        {
          code: '#00001',
          name: 'Dec 28, 2022',
          store: 'Lazada VN',
          description: '$ 1,000',
          rating: "Completed",
        },
        {
            code: '#00001',
            name: 'Dec 28, 2022',
            store: 'Lazada VN',
            description: '$ 1,000',
            rating: "Completed",
        },
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
