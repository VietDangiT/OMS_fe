import { Injectable } from '@angular/core';
import { DateFilterValues } from '../interface/global.model';

@Injectable({
  providedIn: 'root',
})
export abstract class HelperService {
  dateFilterValues: DateFilterValues = {
    week: [this.addDays(new Date(), -7), new Date()],
    month: [this.addDays(new Date(), -30), new Date()],
    year: [this.addDays(new Date(), -365), new Date()],
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

  refactorImg(base64: string): string {
    return `data:image/png;base64, ${base64}`;
  }

  convertToDisplayDate(d: string): string {
    return new Date(d).toLocaleDateString('en-En');
  }
}
