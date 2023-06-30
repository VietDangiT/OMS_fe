import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import {
  DateFilterKey,
  PagingParams,
  ResultItem,
} from 'src/app/demo/interface/global.model';
import { HelperService } from 'src/app/demo/service/helper.service';
import { heatChartOptions } from '../../charts/apex-chart.component';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import {
  baseChartOptions,
  colorArr,
  heatmapChartOptions,
} from '../../share/oms-chart/oms-chart.component';
import { BaseChart } from '../interfaces/dashboard.models';
import { totalSaleByChannelTableHeader } from './constants/total-sale-by-channel.constants';
import { TotalSaleByChannel } from './models/total-sale-by-channel.models';
import { TotalSaleByChannelService } from './services/total-sale-by-channel.service';

interface DataSetItem {
  label: string;
  data: number[];
  borderColor: string;
}

@Component({
  selector: 'dashboard-total-sale-by-channel',
  templateUrl: './total-sale-by-channel.component.html',
  styleUrls: ['./total-sale-by-channel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TotalSaleByChannelComponent implements OnInit {
  private readonly service = inject(TotalSaleByChannelService);

  private readonly helperService = inject(HelperService);

  private readonly router = inject(ActivatedRoute);

  baseChartOption = baseChartOptions;

  dateRange = this.helperService.defaultDateRange;

  tableData: OmsTable<TotalSaleByChannel> = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0,
    totalRecord: 0,
    data: {
      header: totalSaleByChannelTableHeader,
      body: [],
    },
  };

  saleOnChannelData: ChartData = {
    labels: [],
    datasets: [],
  };

  saleByChannelHeatmapData: Partial<heatChartOptions> | unknown = {
    series: [],
    ...heatmapChartOptions,
  };

  params: Partial<PagingParams> = {
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  ngOnInit(): void {
    this.router.queryParams
      .pipe(
        tap(params => {
          if (params['fDate']) {
            this.dateFilterChanged([params['fDate'], params['tDate']]);
          }

          this.getComponentData();
        })
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getChannelOrderTable();

    this.getChannelSalesByDate();
  }

  getChannelOrderTable(): void {
    this.service
      .getChannelOrderTable(this.params)
      .pipe(
        tap(res => {
          const { channelOrderTableData: data } = res;
          const { first, page, pageCount, rows, totalRecord } = data;

          this.tableData = {
            first,
            page,
            pageCount,
            rows,
            totalRecord,
            data: {
              header: [...this.tableData.data.header],
              body: [...data.data],
            },
          };
        })
      )
      .subscribe();
  }

  getChannelSalesByDate(): void {
    this.service
      .getChannelSalesByDate(this.dateRange)
      .pipe(
        tap(res => {
          const { channelSaleByConditionDate: data } = res;

          this.handleHeatMap(data);

          this.handleLineChart(data);
        })
      )
      .subscribe();
  }

  handleLineChart(res: BaseChart[]): void {
    const labelArr: string[] = [];

    const result: DataSetItem[] = [];

    const usedColors: string[] = [];

    res.forEach(item => {
      const { displayText, date, value } = item;

      const currentDate = new Date(date).toLocaleDateString('en-EN');

      let randomColor: string = '';

      if (!usedColors.includes(randomColor)) {
        randomColor = colorArr[Math.floor(Math.random() * colorArr.length)];

        usedColors.push(randomColor);
      }

      let dataSetItem = result.find(i => i.label === displayText);

      if (!dataSetItem) {
        dataSetItem = {
          label: displayText,
          data: [value],
          borderColor: randomColor,
        };
        result.push(dataSetItem);
      }

      dataSetItem.data.push(value);

      labelArr.push(currentDate);
    });

    this.saleOnChannelData = { labels: labelArr, datasets: result };
  }

  handleHeatMap(data: BaseChart[]): void {
    const result: ResultItem[] = [];

    data.forEach(item => {
      const { displayText, value, date } = item;

      const currentDate = new Date(date).toLocaleDateString('en-EN');

      let resultItem = result.find(item => item.name === displayText);

      if (!resultItem) {
        resultItem = { name: displayText, data: [] };
        result.push(resultItem);
      }

      let dataItem = resultItem.data.find(item => item.x === currentDate);

      if (!dataItem) {
        dataItem = { x: currentDate, y: 0 };
        resultItem.data.push(dataItem);
      }

      dataItem.y += value;
    });
    this.saleByChannelHeatmapData = {
      series: result,
      ...heatmapChartOptions,
    };
  }

  dateFilterChanged(dateRange: Date[]): void {
    if (dateRange[1] !== null) {
      this.handleParams('fromDate', dateRange[0]);

      this.handleParams('toDate', dateRange[1]);

      this.getComponentData();
    }
  }

  filterChanged(val: DateFilterKey): void {
    const dateFilterValues = this.helperService.dateFilterValues;

    this.dateFilterChanged(dateFilterValues[val]);
  }

  pagingInfo(e: PagingInfo): void {
    this.handleParams('page', e.page + tableConfig.gapPageNumber);

    this.getComponentData();
  }

  handleParams(
    key: keyof Partial<PagingParams>,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }
}
