import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import { baseChartOptions } from '../../share/oms-chart/oms-chart.component';
import { TotalSalesService } from './services/total-sales.service';

export interface TotalSale {
  date: string;
  numberOfOrders: number;
  avgOrderSales: number;
  numberOfReturn: number;
  totalSales: number;
}

@Component({
  selector: 'oms-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss'],
})
export class TotalSalesComponent {
  filterValue: string;

  baseChartOptions: ChartOptions = baseChartOptions;

  revenueData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: environment.primaryColor,
        fill: false,
      },
      {
        label: 'Second Dataset',
        borderColor: environment.secondaryColor,
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
      },
    ],
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
      {
        label: 'Orders on Zomato',
        data: [56, 69, 89, 61, 36, 75, 50],
        backgroundColor: environment.secondaryColor,
      },
    ],
  };

  tableData: OmsTable<TotalSale> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        { field: 'date', col: 'Date' },
        { field: 'numberOfOrders', col: 'Number of Orders' },
        { field: 'avgOrderSales', col: 'AVG Order Sales' },
        { field: 'numberOfReturn', col: 'Number of Return' },
        { field: 'totalSales', col: 'Total Sales' },
      ],
      body: [
        {
          date: '5/19/2023',
          numberOfOrders: Math.random() * 1000,
          avgOrderSales: Math.random() * 1000,
          numberOfReturn: Math.random() * 1000,
          totalSales: Math.random() * 1000,
        },
        {
          date: '5/20/2023',
          numberOfOrders: Math.random() * 1000,
          avgOrderSales: Math.random() * 1000,
          numberOfReturn: Math.random() * 1000,
          totalSales: Math.random() * 1000,
        },
        {
          date: '5/21/2023',
          numberOfOrders: Math.random() * 1000,
          avgOrderSales: Math.random() * 1000,
          numberOfReturn: Math.random() * 1000,
          totalSales: Math.random() * 1000,
        },
        {
          date: '5/22/2023',
          numberOfOrders: Math.random() * 1000,
          avgOrderSales: Math.random() * 1000,
          numberOfReturn: Math.random() * 1000,
          totalSales: Math.random() * 1000,
        },
      ],
    },
  };

  constructor(private totalSalesService: TotalSalesService) {}

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
