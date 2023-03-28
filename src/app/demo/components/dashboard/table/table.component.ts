import { KeyValue } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'dashboard-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  rangeDates: Date[] = [];
  date!: Date;
  @Input() heading: string = 'Orders on Channel';
  @Input() tableData: Required<DashboardTable> = {
    headerData: [],
    bodyData: [],
  };

  first: number = 0;
  rows: number = 10;  

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  test(dateRange: any[]) {
    console.log(dateRange[0]);
  }
}
