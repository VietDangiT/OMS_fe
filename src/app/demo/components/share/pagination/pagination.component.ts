import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {

  @Output("pagingInfo") pagingInfo = new EventEmitter();

  @Input() currentPagingInfo: any;
  
  first: number = 0;

  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  } 
}
