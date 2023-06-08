import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { DateFilterKey, ResultItem } from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { environment } from 'src/environments/environment';
import { Country } from '../../channel/interface/channel.component';
import { ChannelService } from '../../channel/services/channel.service';
import { heatChartOptions } from '../../charts/apex-chart.component';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import {
  baseChartOptions,
  heatmapChartOptions,
  pieChartColors,
} from '../../share/oms-chart/oms-chart.component';
import { saleByLocationTableHeader } from './constants/sale-by-location.constants';
import {
  CountryPercentage,
  SaleByLocation,
  SaleByLocationParams,
} from './models/sale-by-location.models';
import { SaleByLocationService } from './services/sale-by-location.service';

@Component({
  selector: 'app-sale-by-location',
  templateUrl: './sale-by-location.component.html',
  styleUrls: ['./sale-by-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleByLocationComponent {
  channelService = inject(ChannelService);

  helperService = inject(HelperService);

  service = inject(SaleByLocationService);

  salesData: ChartData;

  countryData: ChartData;

  leadData: ChartData;

  baseChartOptions = baseChartOptions;

  selectedCountry: Country = {
    countryName: '',
    id: 0,
    shortCode: '',
  };

  countries: Country[];

  // dateRange = this.helperService.defaultDateRage;
  dateRange = [new Date('2/4/23'), new Date('3/4/23')];

  heatChartOptions: Partial<heatChartOptions> | unknown = {
    series: [],
    ...heatmapChartOptions,
  };

  pagingNumber: number = 0;

  countryPercentage: CountryPercentage[] = [];

  tableData: OmsTable<SaleByLocation> = {
    first: 0,
    page: tableConfig.page,
    pageCount: 0,
    rows: tableConfig.pageLimit,
    totalRecord: 0,
    data: {
      header: saleByLocationTableHeader,
      body: [],
    },
  };

  destroy$ = new Subject();

  params: SaleByLocationParams = {
    countryName: '',
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  ngOnInit(): void {
    this.getCountries();

    this.getSaleLeads();

    this.getSaleByCountry();

    this.getSaleAnalytic();

    this.getOrderSalesByCountry();
  }

  getCountries(): void {
    this.channelService
      .getCountries()
      .pipe(
        tap(res => {
          this.countries = res.countries;
        })
      )
      .subscribe();
  }

  getSaleLeads(): void {
    this.service
      .getSaleLeads(this.selectedCountry.countryName, this.dateRange)
      .pipe(
        tap(res => {
          const { saleLeads: data } = res;

          const labelArr: string[] = [];
          const valueArr: number[] = [];

          data.forEach(d => {
            labelArr.push(d.displayText);

            valueArr.push(d.value);
          });

          this.leadData = {
            labels: labelArr,
            datasets: [
              {
                data: valueArr,
                backgroundColor: environment.primaryColor,
              },
            ],
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getSaleByCountry(): void {
    this.service
      .getSaleByCountry(this.selectedCountry.countryName, this.dateRange)
      .pipe(
        tap(res => {
          const { saleByCountry: data } = res;

          const labelArr: string[] = [];
          const valueArr: number[] = [];

          data.forEach(d => {
            labelArr.push(d.displayText);

            valueArr.push(d.value);

            this.countryPercentage.push({
              name: d.displayText,
              percentage: d.percentage,
            });
          });

          this.countryData = {
            labels: labelArr,
            datasets: [
              {
                data: valueArr,
                backgroundColor: pieChartColors,
              },
            ],
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getSaleAnalytic(): void {
    this.service
      .getSaleAnalytic(this.selectedCountry.countryName, this.dateRange)
      .pipe(
        tap(res => {
          const { saleAnalytic: data } = res;

          const result: ResultItem[] = [];

          data.forEach(item => {
            const { displayText, value, date } = item;

            const currentDate = new Date(date).toLocaleDateString('en-EN');

            // Check if there's displayText existed
            let resultItem = result.find(item => item.name === displayText);

            if (!resultItem) {
              // If not create new resultItem
              resultItem = { name: displayText, data: [] };
              result.push(resultItem);
            }

            // Find if resultItem.data have current date
            let dataItem = resultItem.data.find(item => item.x === currentDate);

            if (!dataItem) {
              // If not create new dataItem
              dataItem = { x: currentDate, y: 0 };
              resultItem.data.push(dataItem);
            }

            // If already exist push value
            dataItem.y += value;
          });

          this.heatChartOptions = {
            series: result,
            ...heatmapChartOptions,
          };

          console.log(this.heatChartOptions);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getOrderSalesByCountry(): void {
    this.service
      .getOrderSalesByCountry(this.params)
      .pipe(
        tap(res => {
          const { orderSaleByCountry: data } = res;

          this.tableData = {
            first: data.first,
            page: data.page,
            pageCount: data.pageCount,
            rows: data.rows,
            totalRecord: data.totalRecord,
            data: {
              header: [...this.tableData.data.header],
              body: [...data.data],
            },
          };

          console.log(this.tableData);
        })
      )
      .subscribe();
  }

  dateFilterChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }

  filterChanged(filter: DateFilterKey): void {
    console.log(filter);
  }

  pagingInfo(e: PagingInfo): void {
    console.log(e);
  }

  onDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
