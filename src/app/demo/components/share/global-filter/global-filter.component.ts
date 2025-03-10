import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HelperService } from 'src/app/demo/service/helper.service';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GlobalFilterComponent {
  filterValue: MenuItem[] = [
    {
      label: 'Today',
      id: '1',
    },
    {
      label: 'Last 7 days',
      id: '2',
    },
    {
      label: 'Last 30 days',
      id: '3',
    },
  ];

  dateFilter: Date[];

  @Output('dateFilterChange') dateFilterChange = new EventEmitter<Date[]>();

  @Output('filter') filterChange = new EventEmitter<string>();

  constructor(private helperService: HelperService) {}

  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);
  }

  getFilter(dateFilter: string) {
    this.filterChange.emit(dateFilter);
  }

  handleButtonFilter(event: Event) {
    const now = new Date();

    var fromDate;

    this.handleActiveButtonFilter(event);

    switch ((event.target as HTMLInputElement).name) {
      case '1':
        fromDate = this.helperService.addDays(now, -1);
        this.dateFilterChange.emit([fromDate, now]);

        break;

      case '2':
        fromDate = this.helperService.addDays(now, -7);
        this.dateFilterChange.emit([fromDate, now]);

        break;

      case '3':
        fromDate = this.helperService.addDays(now, -30);
        this.dateFilterChange.emit([fromDate, now]);

        break;
    }
  }

  handleActiveButtonFilter(event: Event) {
    const btnsTip = document.querySelectorAll('.dashboard-filter');

    const calendar = document.querySelectorAll('.p-inputtext')[0];

    calendar.classList.remove('active');

    btnsTip.forEach(btn => {
      btn.classList.remove('active');
    });

    (event.target as Element).classList.add('active');

    this.dateFilter = [];
  }
}
