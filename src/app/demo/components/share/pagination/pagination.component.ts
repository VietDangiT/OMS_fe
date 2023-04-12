import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'oms-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {

  @Output("pagingInfo") pagingInfo = new EventEmitter();
  @Input() rows: number = 0;
  @Input() totalRecords: number = 0;
  @Input() first: number = 1;

  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  } 
}
