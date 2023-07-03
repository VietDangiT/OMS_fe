import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChart } from '../components/dashboard/interfaces/dashboard.models';
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

  statusClasses: StatusMap = {
    active: 'text-success',
    completed: 'text-success',
    on_process: 'text-fifth',
    on_shipping: 'text-secondary',
    inactive: 'text-danger',
    failed: 'text-danger',
    pending: 'text-secondary',
    delivery: 'text-secondary',
    return: 'text-primary',
    cancelled: 'text-danger',
    unpaid: 'text-black',
  };

  defaultDateRange: Date[] = [this.addDays(new Date(), -7), new Date()];

  addDays(date: Date, days: number) {
    let result = new Date(date);

    result.setDate(result.getDate() + days);

    return result;
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

  refactorImg(src: string): string {
    return `https://localhost:7121/api/${src}`;
  }

  refactorImgBase64(src: string): string {
    return `data:image/jpeg;base64, ${src}`;
  }

  convertToDisplayDate(
    date: Date | string | number,
    dateRange: Date[] | string[]
  ): string {
    const dates = dateRange.map(m => new Date(m));

    const diffOfDays = Math.floor(
      (dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24)
    );

    const formattingOptions: { [key: number]: Intl.DateTimeFormatOptions } = {
      60: { month: 'long', year: 'numeric' },
      720: { year: 'numeric' },
    };

    for (const daysThreshold in formattingOptions) {
      if (diffOfDays > Number(daysThreshold)) {
        return new Date(date).toLocaleDateString(
          'en-us',
          formattingOptions[daysThreshold]
        );
      }
    }

    return new Date(date).toLocaleDateString();
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
