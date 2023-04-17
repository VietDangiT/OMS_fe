import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PagingInfo } from '../model/paginginfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'oms-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  rowPerPage: number[] = environment.rowPerPage;
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
