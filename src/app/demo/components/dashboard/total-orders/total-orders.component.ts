import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import { baseChartOptions } from '../../share/oms-chart/oms-chart.component';

interface TotalOrder {
  date: string;
  completed: number;
  failed: number;
  return: number;
  numberOfOrders: number;
}
@Component({
  selector: 'oms-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss'],
})
export class TotalOrdersComponent {
  filterValue = '';

  baseChartOptions: ChartOptions = baseChartOptions;

  // defaultDateRange = [new Date(), this.helperService.addDays(new Date(), -7)];
  defaultDateRange = [new Date('1/22/23'), new Date('4/22/23')];

  tableData: OmsTable<TotalOrder> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        { field: 'date', col: 'Date' },
        { field: 'completed', col: 'Completed' },
        { field: 'failed', col: 'Failed' },
        { field: 'return', col: 'Return' },
        { field: 'numberOfOrders', col: 'Number of Orders' },
      ],
      body: [
        {
          date: '5/19/2023',
          completed: Math.random() * 1000,
          return: Math.random() * 1000,
          failed: Math.random() * 1000,
          numberOfOrders: Math.random() * 1000,
        },
        {
          date: '5/20/2023',
          completed: Math.random() * 1000,
          return: Math.random() * 1000,
          failed: Math.random() * 1000,
          numberOfOrders: Math.random() * 1000,
        },
        {
          date: '5/21/2023',
          completed: Math.random() * 1000,
          return: Math.random() * 1000,
          failed: Math.random() * 1000,
          numberOfOrders: Math.random() * 1000,
        },
        {
          date: '5/22/2023',
          completed: Math.random() * 1000,
          return: Math.random() * 1000,
          failed: Math.random() * 1000,
          numberOfOrders: Math.random() * 1000,
        },
      ],
    },
  };

  overviewData: ChartData = {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        label: 'Orders on Swiggy',
        data: [66, 49, 81, 71, 26, 65, 60],
        backgroundColor: environment.primaryColor,
      },
    ],
  };

  dateFilterChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }

  filterChanged(filter: string): void {
    this.filterValue = filter;
    console.log(this.filterValue);
  }

  onPageChange(e: Event): void {
    console.log(e);
  }
}
