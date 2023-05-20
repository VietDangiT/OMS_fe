import {
  Component,
  EventEmitter,
  HostBinding,
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
  @HostBinding('class') hostClass = 'oms-table-host';

  @Output() pagingInfo = new EventEmitter();

  @Input() isCheckboxShown = false;

  @Input() isPaginationShown = false;

  @Input() table: OmsTable<any> = {
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

  selectedRows: any[];

  onPageChange(event: Event) {
    this.pagingInfo.emit(event);
  }
}
