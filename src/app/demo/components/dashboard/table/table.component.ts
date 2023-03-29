import { KeyValue } from '@angular/common';
import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  date!: Date;
  
  @Input() heading: string = 'Orders on Channel';
  
  @Input() tableData: Required<DashboardTable> = {
    headerData: [],
    bodyData: [],
  };
  
  @Input() currentPagingInfo: any;

  @Output("pagingInfo") pagingInfo = new EventEmitter();

  first: number = 0;

  ngOnInit(){
  }
  
  onPageChange(event: any) {
    this.pagingInfo.emit(event);
  } 

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}
