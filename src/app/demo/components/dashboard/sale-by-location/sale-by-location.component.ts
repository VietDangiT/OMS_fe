import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  barBaseChartOptions,
  baseChartOptions,
  heatmapChartOptions,
  pieChartColors,
  pieChartOptions,
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
  styleUrls: ['./sale-by-location.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleByLocationComponent {
  @HostBinding('class') hostClass = 'sale-by-location-host';

  private readonly channelService = inject(ChannelService);

  private readonly helperService = inject(HelperService);

  private readonly service = inject(SaleByLocationService);

  private readonly router = inject(ActivatedRoute);

  salesData: ChartData = {
    labels: [],
    datasets: [],
  };

  countryData: ChartData = {
    labels: [],
    datasets: [],
  };

  leadData: ChartData = {
    labels: [],
    datasets: [],
  };

  baseChartOptions = baseChartOptions;

  barBaseChartOptions = barBaseChartOptions;

  pieChartOptions = pieChartOptions;

  selectedCountry: Country = {
    countryName: '',
    id: 0,
    shortCode: '',
    displayName: 'ALL COUNTRIES',
  };

  countries: Country[] = [];

  dateRange = this.helperService.defaultDateRange;

  comparedDateRange: Date[] = [];

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
    countryName: this.selectedCountry.countryName,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  totalCurrentSale = 0;

  comparedPercentage = 0;

  ngOnInit(): void {
    this.getCountries();

    this.router.queryParams
      .pipe(
        tap(params => {
          if (params['fDate']) {
            this.dateFilterChanged([params['fDate'], params['tDate']]);
          }

          this.getComponentData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getSaleLeads();

    this.getSaleByCountry();

    this.getSaleAnalytic();

    this.getOrderSalesByCountry();

    this.getComparedTotalSale();

    this.calculateComparedDate();
  }

  getCountries(): void {
    this.channelService
      .getCountries()
      .pipe(
        tap(res => {
          this.countries = res.countries.map(c => {
            return { ...c, displayName: c.countryName };
          });

          this.countries.unshift(this.selectedCountry);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getSaleLeads(): void {
    const dateRange = [this.params.fromDate!, this.params.toDate!];

    this.service
      .getSaleLeads(this.params.countryName, dateRange)
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

  getComparedTotalSale(): void {
    const dateRange = [this.params.fromDate!, this.params.toDate!];

    this.service
      .getComparedTotalSale(this.params.countryName, dateRange)
      .pipe(
        tap(res => {
          const { totalSaleByCountryAtTimes: data } = res;
          const { previousData, currentData } = data;
          let totalPreviousVal = 0;
          let totalCurrentVal = 0;
          const labelArr: string[] = [];
          const valueArr: number[] = [];

          previousData.forEach(d => {
            totalPreviousVal += d.value;
          });

          currentData.forEach(d => {
            totalCurrentVal += d.value;

            labelArr.push(new Date(d.date).toLocaleDateString());
            valueArr.push(d.value);
          });

          this.totalCurrentSale = totalCurrentVal;

          this.comparedPercentage =
            totalPreviousVal > 0 ? totalCurrentVal / totalPreviousVal : -100;

          this.salesData = {
            labels: labelArr,
            datasets: [
              {
                data: valueArr,
                borderColor: environment.primaryColor,
              },
            ],
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  calculateComparedDate(): void {
    const diffInMilliSeconds = Math.abs(
      new Date(this.dateRange[1]).getTime() -
        new Date(this.dateRange[0]).getTime()
    );

    const diffInDays = Math.ceil(diffInMilliSeconds / (1000 * 60 * 60 * 24));

    const previousDate = this.helperService.addDays(
      this.dateRange[0],
      -diffInDays
    );

    this.comparedDateRange = [previousDate, this.dateRange[0]];
  }

  getSaleByCountry(): void {
    const dateRange = [this.params.fromDate!, this.params.toDate!];

    this.service
      .getSaleByCountry(this.params.countryName, dateRange)
      .pipe(
        tap(res => {
          const { saleByCountry: data } = res;

          this.countryPercentage = [];

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
    const dateRange = [this.params.fromDate!, this.params.toDate!];

    this.service
      .getSaleAnalytic(this.params.countryName, dateRange)
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.handleParams('fromDate', dateRange[0]);

      this.handleParams('toDate', dateRange[1]);

      this.dateRange = [dateRange[0], dateRange[1]];

      this.getComponentData();
    }
  }

  filterChanged(filter: DateFilterKey): void {
    const dateFilterValues = this.helperService.dateFilterValues;

    this.dateFilterChanged(dateFilterValues[filter]);
  }

  pagingInfo(e: PagingInfo): void {
    this.handleParams('page', e.page + tableConfig.gapPageNumber);

    this.getComponentData();
  }

  onChangeCountry(): void {
    this.handleParams('countryName', this.selectedCountry.countryName);

    this.getComponentData();
  }

  handleParams(
    key: keyof Partial<SaleByLocationParams>,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }

  onDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
