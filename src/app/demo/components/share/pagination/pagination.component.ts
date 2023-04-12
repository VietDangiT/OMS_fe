import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagingInfo } from './paginginfo';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {

  @Output("pagingInfo") pagingInfo = new EventEmitter();

  @Input() currentPagingInfo: PagingInfo;
  
  first: number = 0;

  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  } 
}
