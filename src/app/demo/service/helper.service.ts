import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChart } from '../components/dashboard/interfaces/dashboard.models';
import { ProductStatistic } from '../components/share/enums/product.enum';
import { StatusColor } from '../components/share/enums/status.enum';
import { colorObj } from '../components/share/oms-chart/oms-chart.component';
import { DateFilterValues, StatusMap } from '../interface/global.model';

@Injectable({
  providedIn: 'root',
})
export abstract class HelperService {
  dateFilterValues: DateFilterValues = {
    week: [this.addDays(new Date(), -7), new Date()],
    month: [this.addDays(new Date(), -30), new Date()],
    year: [this.addDays(new Date(), -365), new Date()],
  };

  stockStatuses: StatusMap = {
    live: ProductStatistic.LIVE,
    inactive: ProductStatistic.INACTIVE,
    outofstock: ProductStatistic.OUT_OF_STOCK,
    lowofstock: ProductStatistic.LOW_OF_STOCK,
    ondemand: ProductStatistic.ON_DEMAND,
  };

  statusClasses: StatusMap = {
    active: StatusColor.SUCCESS,
    completed: StatusColor.SUCCESS,
    on_process: StatusColor.FIFTH,
    on_shipping: StatusColor.WARNING,
    inactive: StatusColor.DANGER,
    failed: StatusColor.DANGER,
    pending: StatusColor.WARNING,
    delivery: StatusColor.WARNING,
    return: StatusColor.PRIMARY,
    cancelled: StatusColor.WARNING,
    unpaid: StatusColor.BLACK,
  };

  defaultDateRange: Date[] = [this.addDays(new Date(), -7), new Date()];

  addDays(date: Date | string, days: number): Date {
    let result = new Date(date);

    result.setDate(result.getDate() + days);

    return new Date(result);
  }

  base64ToBytes(base64String: string): Uint8Array {
    const base64WithoutPrefix = base64String.replace(
      /^data:image\/\w+;base64,/,
      ''
    );

    const decodedData = atob(base64WithoutPrefix);

    const outputArray = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      outputArray[i] = decodedData.charCodeAt(i);
    }

    return outputArray;
  }

  arrayBufferToBase64(arrayBuffer: any): string {
    let binary = '';

    const bytes = new Uint8Array(arrayBuffer);

    const length = bytes.byteLength;

    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }

  prefixImgSrc(src: string): string {
    return `https://localhost:7121/api/${src}`;
  }

  refactorImgBase64(src: string): string {
    return `data:image/jpeg;base64, ${src}`;
  }

  convertToDisplayDate(
    date: Date | string | number,
    dateRange: Date[] | string[]
  ): string {
    const months = this.getMonthGap(dateRange);

    const formattingOptions: { [key: number]: Intl.DateTimeFormatOptions } = {
      2: { month: 'long', year: 'numeric' },
      12: { year: 'numeric' },
    };

    for (const monthsThreshold in formattingOptions) {
      if (months >= Number(monthsThreshold)) {
        return new Date(date).toLocaleDateString(
          'en-us',
          formattingOptions[monthsThreshold]
        );
      }
    }

    return new Date(date).toLocaleDateString();
  }

  getMonthGap(dateRange: Date[] | string[]): number {
    return (
      (new Date(dateRange[1]).getFullYear() -
        new Date(dateRange[0]).getFullYear()) *
        12 +
      new Date(dateRange[1]).getMonth() -
      new Date(dateRange[0]).getMonth()
    );
  }

  setupBasicChartData(
    data: BaseChart[],
    dateRange: Date[] | string[],
    isText = false,
    label = ''
  ): ChartData {
    let totalArr: number[] = [];

    let labelArr: string[] = [];

    data.forEach((item: BaseChart) => {
      totalArr.push(item.value);

      labelArr.push(
        !isText
          ? this.convertToDisplayDate(item.date, dateRange)
          : item.displayText
      );
    });

    return this.setChartData(labelArr, totalArr, label);
  }

  setChartData(
    labels: string[],
    data: number[],
    label: string = ''
  ): ChartData {
    return {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: colorObj['primary'],
          backgroundColor: colorObj['primary'],
          pointRadius: 0,
        },
      ],
    };
  }
}
