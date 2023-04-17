import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { OmsTable } from '../model/oms-table';

@Component({
  selector: 'oms-table',
  templateUrl: './oms-table.component.html',
  styleUrls: ['./oms-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OmsTableComponent {
  @Output() pagingInfo = new EventEmitter();
  @Input() table: OmsTable = {
    page: 0, 
    first: 0, 
    rows: 0, 
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [],
      body: [],
    },
  };

  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  }
}
