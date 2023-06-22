import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oms-screen-filter',
  templateUrl: './screen-filter.component.html',
  styleUrls: ['./screen-filter.component.scss'],
})
export class ScreenFilterComponent {
  @Output('searchValue') getSearchValue = new EventEmitter<string>();

  @Output('dateFilterChange') dateFilterChange = new EventEmitter<Date[]>();

  @Output('filter') filterChange = new EventEmitter<string>();

  @Input('isDateFilterShow') isDateFilterShow = true;

  dateFilter: string[];

  searchValue: string;
  

  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }

  getSearchValueInternal(search: string) {
    this.getSearchValue.emit(search);
  }
}
