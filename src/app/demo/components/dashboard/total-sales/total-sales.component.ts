import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ChartData, ChartOptions } from 'chart.js';
import { map, tap } from 'rxjs';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import { baseChartOptions } from '../../share/oms-chart/oms-chart.component';
import { totalSalesTableHeader } from './constants/total-sales.constants';
import { TotalSalesTableDTO } from './models/total-sales.models';
import { TotalSalesService } from './services/total-sales.service';

@Component({
  selector: 'oms-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss'],
})
export class TotalSalesComponent {
  filterValue: string;

  baseChartOptions: ChartOptions = baseChartOptions;

  saleBoxTitle = 'sales';

  avgOrderSaleBoxTitle = 'avg. order sales';

  returnBoxTitle = 'return';

  overviewStyleClass = 'bg-brightOrange';

  // defaultDateRange = [new Date(), this.helperService.addDays(new Date(), -7)];
  defaultDateRange = [new Date('1/22/23'), new Date('4/22/23')];

  defaultPageNumber = 1;

  itemsPerPage = 6;

  totalSales = 0;

  totalSalesPercent = 0;

  avgSales = 0;

  avgSalesPercent = 0;

  totalReturn = 0;

  totalReturnPercent = 0;

  revenueData: ChartData;

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

  tableData: OmsTable<TotalSalesTableDTO> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: totalSalesTableHeader,
      body: [],
    },
  };

  constructor(
    private totalSalesService: TotalSalesService,
    private helperService: HelperService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.getTotalSalesTable(this.defaultPageNumber);
    this.getTotalSales();
    this.getReturn();

    this.apollo
      .watchQuery({
        query: gql`{
        totalSale(fromDate: "${this.defaultDateRange[0].toLocaleDateString()}",
        toDate: "${this.defaultDateRange[1].toLocaleDateString('en-US')}") {
          date
          value
        }
      }`,
      })
      .valueChanges.pipe(map(res => console.log(res.data)))
      .subscribe();
  }

  getTotalSalesTable(page: number) {
    this.totalSalesService
      .getTotalSalesTable(
        this.defaultDateRange[0].toLocaleDateString('en-EN'),
        this.defaultDateRange[1].toLocaleDateString('en-EN'),
        page,
        this.itemsPerPage
      )
      .pipe(
        tap(res => {
          this.tableData = {
            page: res.paging.currentPage,
            first: res.paging.first,
            rows: this.itemsPerPage,
            pageCount: res.paging.totalPages,
            totalRecord: res.paging.totalCount,
            data: {
              header: totalSalesTableHeader,
              body: res.data,
            },
          };
        })
      )
      .subscribe();
  }

  getTotalSales() {
    this.totalSalesService
      .getTotalSales(
        this.defaultDateRange[0].toLocaleDateString('en-EN'),
        this.defaultDateRange[1].toLocaleDateString('en-EN')
      )
      .pipe(
        tap(res => {
          const { compareData, selectedData } = res[0];

          let totalArr: number[] = [];
          let labelArr: string[] = [];

          let totalSales = 0;
          let totalSalesCompareData = 0;

          compareData.forEach(i => {
            totalSalesCompareData += i.value;
          });

          selectedData.forEach(i => {
            totalSales += i.value;

            totalArr.push(i.value);
            labelArr.push(new Date(i.date).toLocaleDateString('en-EN'));
          });

          this.totalSales = totalSales;
          this.totalSalesPercent = totalSales / totalSalesCompareData;

          let avgSalesCompareData = totalSalesCompareData / compareData.length;

          this.avgSales = totalSales / selectedData.length;
          this.avgSalesPercent = this.avgSales / avgSalesCompareData;

          this.revenueData = {
            labels: labelArr,
            datasets: [
              {
                data: totalArr,
                borderColor: environment.primaryColor,
                fill: false,
              },
            ],
          };
        })
      )
      .subscribe();
  }

  getReturn() {
    this.totalSalesService
      .getReturn(
        this.defaultDateRange[0].toLocaleDateString('en-EN'),
        this.defaultDateRange[1].toLocaleDateString('en-EN')
      )
      .pipe(
        tap(res => {
          const { compareData, selectedData } = res[0];

          let totalReturn = 0;
          let totalReturnCompareData = 0;

          compareData.forEach(i => {
            totalReturnCompareData += i.value;
          });

          selectedData.forEach(i => {
            totalReturn += i.value;
          });

          this.totalReturnPercent = totalReturn / totalReturnCompareData;
          this.totalReturn = totalReturn;
        })
      );
  }

  dateFilterChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }

  filterChanged(filter: string): void {
    this.filterValue = filter;
    console.log(this.filterValue);
  }

  onPageChange(e: PageChangeEvent): void {
    this.getTotalSalesTable(e.page + 1);
  }
}
