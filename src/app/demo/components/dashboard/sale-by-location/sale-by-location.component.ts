import { Component } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";
import { DashboardService } from "src/app/demo/service/dashboard.service";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { environment } from "src/environments/environment";
import { heatChartOptions } from "../../charts/apex-chart.component";
import { DashboardTable } from "../interfaces/dashboard-table";



@Component({
  selector: 'app-sale-by-location',
  templateUrl: './sale-by-location.component.html',
  styleUrls: ['./sale-by-location.component.scss'],
})
export class SaleByLocationComponent {
  isSubmenuOn: boolean | undefined;
  salesData!: ChartData;
  countryData!: ChartData;
  leadData!: ChartData;
  baseChartOptions!: ChartOptions;
  heatChartOptions: Partial<heatChartOptions> | any;
  navbarState: boolean | undefined;

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
    this.heatChartOptions = {
      plotOptions: {
        heatmap: {
          radius: 10,
          distributed: false,
        },
      },
      series: [
        {
          name: 'Vietnam',
          data: this.generateData(9, {
            min: 1000,
            max: 20000,
          }),
        },
        {
          name: 'Thailand',
          data: this.generateData(9, {
            min: 1000,
            max: 20000,
          }),
        },
        {
          name: 'Malaysia',
          data: this.generateData(9, {
            min: 1000,
            max: 20000,
          }),
        },
        {
          name: 'Singapore',
          data: this.generateData(9, {
            min: 1000,
            max: 20000,
          }),
        },
      ],
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

    this.layoutService.currentSubMenuState.subscribe(
      (state) => (this.isSubmenuOn = state)
    );

    //must return data by order (from largest)
    this.countryData = {
      labels: ['Vietnam', 'Thailand', 'Singapore', 'Malaysia'],
      datasets: [
        {
          data: [300, 120, 100, 50],
          backgroundColor: ['#27447C', '#FCA310', '#ED7D2D', '#F3F4F6'],
        },
      ],
    };
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
    
    this.leadData = {
      labels: ['Singapore', 'Thailand', 'Vietnam', 'Malaysia'],
      datasets: [
        {
          backgroundColor: '#27447C',
          data: [65, 59, 80, 81],
        },
        {
          backgroundColor: '#FCA310',
          data: [28, 48, 40, 19],
        },
      ],
    };
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

  convertMonthToString(numbers: number[]): string[]{
    var result:string[]=[];
    numbers.forEach(num=> {
      switch (num) {
        case 0:
          result.push('January')
          break;
          case 1:
            result.push('Febuary')
            break;
            case 2:
          result.push('March')
          break;
          case 3:
          result.push('April')
          break;
          case 4:
          result.push('May')
          break;
          case 5:
          result.push('June')
          break;
          case 6:
          result.push('July')
          break;
          case 7:
          result.push('August')
          break;
          case 8:
          result.push('September')
          break;
          case 9:
          result.push('October')
          break;
          case 10:
          result.push('November')
          break;
          case 11:
            result.push('December')
            break;

      }
    });
    return result;
  }

  triggerSubmenu() {
    this.layoutService.changeSubMenuState(false);
  }

  generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
}
        