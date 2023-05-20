import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'oms-screen-filter',
  templateUrl: './screen-filter.component.html',
  styleUrls: ['./screen-filter.component.scss'],
})
export class ScreenFilterComponent {
  @Output('searchValue') getSearchValue = new EventEmitter<string>();

  @Output('dateFilterChange') dateFilterChange = new EventEmitter<Date[]>();

  @Output('filter') filterChange = new EventEmitter<string>();

  dateFilter: string[];
  searchValue: string;

  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }

  getSearchValueInternal(search: string) {
    this.getSearchValue.emit(search);
  }
}
