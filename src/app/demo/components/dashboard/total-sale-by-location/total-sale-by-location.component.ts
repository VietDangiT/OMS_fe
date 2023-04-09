import { AfterViewInit, Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';
import resolveConfig from 'tailwindcss/resolveConfig';

@Component({
  selector: 'dashboard-total-sale-by-location',
  templateUrl: './total-sale-by-location.component.html',
  styleUrls: ['./total-sale-by-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalSaleByLocationComponent  {
  @Input() filterArr: (string | null)[] = [null, null];

  chartData: string[][] = [['Country','Sale']];
  locationSale: {displayText: string, value: number}[];

  constructor(private _dashboardService: DashboardService){}

  ngOnInit(): void {
    this.getTotalSaleByLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      // this.data.series[0].data = [...changes['data'].currentValue];
    }
    if (changes['rangeDate']?.currentValue) {
      if (this.filterArr[0] && this.filterArr[1]){
        // this.getTotalSaleByChannel(changes['rangeDate']?.currentValue);
      }
    }
  }

  getTotalSaleByLocation(
    rangeDate: (string | null)[] = [null, null]
  ) {
    this._dashboardService
      .getTotalSaleByLocation(
        rangeDate[0] ? rangeDate[0] : '',
        rangeDate[1] ? rangeDate[1] : ''
      )
      .subscribe((data: any[]) => {
        this.locationSale.length = 0;
        const temp = [['Country','Sale']];
        data.forEach((item: any)=> {
          temp.push([`${item.displayText}`,`${item.value}`])
          this.locationSale.push({
            displayText: item.displayText,
            value: item.value
          })
        })
        this.chartData = [...temp]
      });
  }
}
