import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PagingInfo } from '../model/paginginfo';

@Component({
  selector: 'oms-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  @Output() pagingInfo = new EventEmitter();
  @Input() currentPagingInfo: PagingInfo = {
    page: 0, 
    first: 0, 
    rows: 0, 
    pageCount: 0,
    totalRecord: 0,
  };

  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  } 
}
