import { ViewEncapsulation } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface FilterOption {
  text: string;
  value: string | number;
}

@Component({
  selector: 'oms-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateFilterComponent {
  filter: string = 'week';
  dateFilter!: Date[];
  defaultDate: Date = new Date();
  @Output("dateFilterChange") dateFilterChange = new EventEmitter<Date[]>(); 
  @Output("filter") filterChange = new EventEmitter<string>();
  @Input() filterOptions: FilterOption[] = [
    {
      text: 'Weekly',
      value: 'week',
    },
    {
      text: 'Monthly',
      value: 'month',
    },
    {
      text: 'Yearly',
      value: 'year',
    },
  ];
  ngOnInit() {
  }
  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }
  getFilter(dateFilter: string){
    this.filterChange.emit(dateFilter);
  }
}
