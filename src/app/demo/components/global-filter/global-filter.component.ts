import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalFilterComponent {
  filterValue: any[]= [{
    value : "Today",
    name:1
  },
  {
    value: "Last 7 days", 
    name:2
  },
  {
    value: "Last 30 days",
    name:3
  }
  ]
  @Output("dateFilterChange") dateFilterChange = new EventEmitter<Date[]>(); 
  @Output("filter") filterChange = new EventEmitter<string>();
  dateFilter!: Date[];

  constructor(private helperService: HelperService) {
    
  }
  getDateRange(dateRange: Date[]) {
    this.dateFilterChange.emit(dateRange);    
  }

  getFilter(dateFilter: string){
    this.filterChange.emit(dateFilter);
  }

  handleButtonFilter(event: any){
    const now = new Date();
    var fromDate;
    this.handleActiveButtonFilter(event);
    switch (event.target.name) {
      case '1':
        fromDate = this.helperService.addDays(now, -1);
        this.dateFilterChange.emit([fromDate, now])
      break;
      case '2':
        fromDate = this.helperService.addDays(now, -7);
        this.dateFilterChange.emit([fromDate, now])
      break;
      case '3':
        fromDate = this.helperService.addDays(now, -30);
        this.dateFilterChange.emit([fromDate, now])
      break;
    }
  }

  handleActiveButtonFilter(event: any){
    const btnsTip = document.querySelectorAll(".dashboard-filter");
    const calendar = document.querySelectorAll(".p-inputtext")[0];
    calendar.classList.remove("active");
    btnsTip.forEach((btn)=>{
     btn.classList.remove("active");
    })
    event.target.classList.add("active");
    this.dateFilter = [];
  }

  handleCalendar(event: any){
    this.handleActiveButtonFilter(event);    
  }
}
