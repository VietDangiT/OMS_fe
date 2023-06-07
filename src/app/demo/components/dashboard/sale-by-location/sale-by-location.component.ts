import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subject, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { DateFilterKey } from 'src/app/demo/interface/global.model';
import { Country } from '../../channel/interface/channel.component';
import { ChannelService } from '../../channel/services/channel.service';
import { heatChartOptions } from '../../charts/apex-chart.component';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import {
  baseChartOptions,
  heatmapChartOptions,
} from '../../share/oms-chart/oms-chart.component';
import { saleByLocationTableHeader } from './constants/sale-by-location.constants';
import { SaleByLocation } from './models/sale-by-location.models';
import { SaleByLocationService } from './services/sale-by-location.service';

@Component({
  selector: 'app-sale-by-location',
  templateUrl: './sale-by-location.component.html',
  styleUrls: ['./sale-by-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleByLocationComponent {
  channelService = inject(ChannelService);

  service = inject(SaleByLocationService);

  salesData: ChartData;

  countryData: ChartData;

  leadData: ChartData;

  baseChartOptions = baseChartOptions;

  selectedCountry: Country;

  countries: Country[];

  heatChartOptions: Partial<heatChartOptions> | unknown = {
    series: [
      {
        name: 'Vietnam',
        data: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
      {
        name: 'Thailand',
        data: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
      {
        name: 'Malaysia',
        data: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
      {
        name: 'Singapore',
        data: [
          {
            x: 1,
            y: 1,
          },
        ],
      },
    ],
    ...heatmapChartOptions,
  };

  pagingNumber: number = 0;

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

  ngOnInit(): void {
    this.getCountries();
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
