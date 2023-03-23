import { Component } from '@angular/core';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  rangeDates: Date[] = [];
  tableData: DashboardTable = {
    headerData: ["Channel", "Status", "Number of Orders", "Total Sales"],
    bodyData: [
      {
        
      }
    ],
  };
}
