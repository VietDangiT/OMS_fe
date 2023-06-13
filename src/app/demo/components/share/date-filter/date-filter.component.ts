import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DateFilterKey } from 'src/app/demo/interface/global.model';

interface FilterOption {
  text: string;
  value: string | number;
}

@Component({
  selector: 'oms-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class DateFilterComponent {
  filter: string = 'week';

  dateFilter!: Date[];

  defaultDate: Date = new Date();

  @Output('dateFilterChange') dateFilterChange = new EventEmitter<Date[]>();

  @Output('filter') filterChange = new EventEmitter<DateFilterKey>();

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

  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }

  getFilter(dateFilter: DateFilterKey) {
    this.filterChange.emit(dateFilter);
  }
}
