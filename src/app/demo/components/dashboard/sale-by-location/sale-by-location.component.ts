import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { heatChartOptions } from '../../charts/apex-chart.component';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'app-sale-by-location',
  templateUrl: './sale-by-location.component.html',
  styleUrls: ['./sale-by-location.component.scss']
})
export class SaleByLocationComponent {

  isSubmenuOn : boolean | undefined;
  salesData!: ChartData;
  countryData!: ChartData;
  leadData!: ChartData;
  baseChartOptions!: ChartOptions;
  heatChartOptions: Partial<heatChartOptions> | any;
  navbarState:boolean | undefined;

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
  constructor(private layoutService : LayoutService) {
  }
  generateData(count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  ngOnInit() {
    this.heatChartOptions = {
      plotOptions: {
        heatmap: {
          radius: 10,
          distributed: false,
        }
      },
      series: [
        {
          name: "Vietnam",
          data: this.generateData(9, {
            min: 1000,
            max: 20000
          })
        },
        {
          name: "Thailand",
          data: this.generateData(9, {
            min: 1000,
            max: 20000
          })
        },
        {
          name: "Malaysia",
          data: this.generateData(9, {
            min: 1000,
            max: 20000
          })
        },
        {
          name: "Singapore",
          data: this.generateData(9, {
            min: 1000,
            max: 20000
          })
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
    
    this.layoutService.currentSubMenuState.subscribe(state => this.isSubmenuOn = state);
    
    this.salesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Sales',
              data: [1000, 200, 500, 1000, 5000, 4500, 2000],
              fill: false,
              borderColor: '#27447C',
              tension: .4
          }
      ]
    };
    
  //must return data by order (from largest)
    this.countryData = {
    labels: [
          'Vietnam',
          'Thailand',
          'Singapore',
          'Malaysia'
        ],
    datasets: [
        {
            data: [300, 120, 100, 50],
            backgroundColor: [
                "#27447C",
                "#FCA310",
                '#ED7D2D',
                "#F3F4F6"
            ]
        },
      ],
    };
    this.baseChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins:{
        legend:{
          display:false,
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {

          grid: {
            display: false
          }
        }
      },
      
    };
    this.leadData = {
      labels: ['Singapore', 'Thailand', 'Vietnam', 'Malaysia'],
      datasets: [
          {
              backgroundColor: '#27447C',
              data: [65, 59, 80, 81]
          },
          {
              backgroundColor: '#FCA310',
              data: [28, 48, 40, 19]
          }
      ]
    };
  }
  
  triggerSubmenu(){
    this.layoutService.changeSubMenuState(false);
  }
}
