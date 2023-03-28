import { Component, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { heatChartOptions } from '../../charts/apex-chart.component';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'app-sale-by-location',
  templateUrl: './sale-by-location.component.html',
  styleUrls: ['./sale-by-location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleByLocationComponent {
  
  isSubmenuOn!: boolean ;

  salesData!: ChartData;

  countryData!: ChartData;

  leadData!: ChartData;

  baseChartOptions!: ChartOptions;

  heatChartOptions: Partial<heatChartOptions> | any = {
    plotOptions: {
      heatmap: {
        radius: 30,
        distributed: false,
      }
    },
    series: [
      {
        name: "Vietnam",
        data: [{
          x:1,y:1
        }]
      },
      {
        name: "Thailand",
        data:  [{
          x:1,y:1
        }]
      },
      {
        name: "Malaysia",
        data:  [{
          x:1,y:1
        }]
      },
      {
        name: "Singapore",
        data:  [{
          x:1,y:1
        }]
      }
    ],
    chart: {
      height: 350,
      type: "heatmap",
      toolbar:{
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#27447C"],
  };

  filter: string = 'month';

  tableData: DashboardTable = {
    headerData: ['Location', 'Date', 'Number of Orders', 'Total Sales'],
    bodyData: [
      {
        location: 'Vietnam',
        date: 'November',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        location: 'Thailand',
        date: 'November',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        location: 'Malaysia',
        date: 'November',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        location: 'Singapore',
        date: 'November',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        location: 'Switzerland',
        date: 'November',
        numberOrder: 10,
        totalSale: 12,
      },
    ],
  };

  constructor(
    private layoutService: LayoutService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getSaleByLocation();
    this.getCountriesSale();
    this.getLeads();
    this.getSalesAnalytics();

    this.layoutService.currentSubMenuState.subscribe(
      (state) => (this.isSubmenuOn = state)
    );

    this.baseChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

  }

  getSalesAnalytics(){
    this.dashboardService.getCountriesSale(this.filter).subscribe((data:any)=>{
      var d = data.data;
      var series: any = [];
      d.forEach((item: any)=> {
        const dataArr: any = item.saleInfo.map((item: any)=>{
          return {x:item.month, y:item.sales}
        })
        series.push({name: item.location, data: dataArr})
      })

     this.heatChartOptions = {
      plotOptions: {
        heatmap: {
          radius: 10,
          distributed: false,
        },
      },
      series: series,
      chart: {
        height: 350,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [environment.primaryColor],
    };
    })
  }

  getCountriesSale() {
    this.dashboardService.getCountriesSaleInTotal(this.filter).subscribe((data) => {
      var totalArr: number[] = [];
      var labelArr: number[] = [];
      data['data'].map((item: any) => {
        totalArr.push(item.sales);
        labelArr.push(item.location);
      });

      this.countryData = {
        labels: labelArr,
        datasets: [
          {
            data: totalArr,
            backgroundColor: [
              environment.primaryColor,
              environment.secondaryColor,
              environment.thirdColor,
              environment.fourthColor,
            ],
            tension: 0.4,
          },
        ],
      };
    });
  }

  getLeads() {
    this.dashboardService.getLeads(this.filter).subscribe((data) => {
      var totalArr: number[] = [];
      var labelArr: number[] = [];
      data['data'].map((item: any) => {
        totalArr.push(item.sales);
        labelArr.push(item.location);
      });

      this.leadData = {
        labels: labelArr,
        datasets: [
          {
            backgroundColor: environment.primaryColor,
            data: totalArr,
          },
        ],
      };
    });
  }

  getSaleByLocation(location: string = 'vietnam') {
    this.dashboardService.getSaleByLocation(location).subscribe((data: any) => {
      var totalArr: number[] = [];
      var labelArr: number[] = [];
      data['data'].map((item: any) => {
        totalArr.push(item.sales);
        labelArr.push(new Date(Date.parse(item.date)).getMonth());
      });

      this.salesData = {
        labels: this.convertMonthToString(labelArr),
        datasets: [
          {
            data: totalArr,
            borderColor: environment.primaryColor,
            tension: 0.4,
          },
        ],
      };
    });
  }

  convertMonthToString(numbers: number[]): string[] {
    var result: string[] = [];
    numbers.forEach((num) => {
      switch (num) {
        case 0:
          result.push('January');
          break;
        case 1:
          result.push('Febuary');
          break;
        case 2:
          result.push('March');
          break;
        case 3:
          result.push('April');
          break;
        case 4:
          result.push('May');
          break;
        case 5:
          result.push('June');
          break;
        case 6:
          result.push('July');
          break;
        case 7:
          result.push('August');
          break;
        case 8:
          result.push('September');
          break;
        case 9:
          result.push('October');
          break;
        case 10:
          result.push('November');
          break;
        case 11:
          result.push('December');
          break;
      }
    });
    return result;
  }

  triggerSubmenu() {
    this.layoutService.changeSubMenuState(false);
  }

}
