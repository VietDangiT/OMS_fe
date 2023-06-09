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
}
