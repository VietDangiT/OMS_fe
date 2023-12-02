import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

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

  @Input() dateFilter: Date[];

  searchValue: string;

  queryField = new FormControl();

  ngOnInit(): void {
    this.getSearchValueInternal();
  }

  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }

  getSearchValueInternal() {
    this.queryField.valueChanges
      .pipe(
        debounceTime(500),
        tap(res => {
          this.getSearchValue.emit(res);
        })
      )
      .subscribe();
  }
}
