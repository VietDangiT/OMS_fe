import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
    addDays(date: Date, days: number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
}
