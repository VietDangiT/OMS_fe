import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../service/customer.service';

@Component({
  templateUrl: './customer.component.html',
})

export class CustomerComponent implements OnInit {
  pieData: ChartData;
  pieOptions: any;
  chartOptions: any;
  //feedback
  lineData: ChartData;
  Feedback: any[] = [];
  Fedback: any[] = [];

  filter: string[] ;
  filterArr : string[] =[
    new Date().toLocaleDateString().toString(),
    new Date().toLocaleDateString().toString()
   ];

   constructor (
      private customerservice: CustomerService

   ) {}


  ngOnInit() {
    this.initPieChart()
    this.initChartOption()
    this.initChart()
    this.initProductCatalogData()
  }

  initPieChart(){
    this.pieData = {
      labels: ['25% Approved', '35% Pending', '40% Unapproved'],
      datasets: [
        {
          data: [25, 35, 40],
          backgroundColor: ['#FCA310', '#27447C', '#E3964A'],
          hoverBackgroundColor: ['#213969', '#415b8c', '#2c55a0'],
        },
      ],
    };
  }


  initChartOption(){
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display:false,
        },
      },

    };
    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      cutout: 120,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxHeight: 10,
            boxWidth: 10,
            padding: 30,
            usePointStyle: true,
            color: environment.primaryColor,
            font: {
              size: 15,

            },
          },
        },
      },
    };
  }

  initChart() {
    this.lineData = {
      labels: this.Feedback,
      datasets: [
        {
          data: this.Fedback,
          fill: false,
          backgroundColor: environment.primaryColor,
          borderColor: environment.primaryColor,
          tension: 0.4,
        },
      ],
    };

  }
  initProductCatalogData() {
    this.customerservice.GetFeedback().subscribe((data: any) => {
      const tmp = this.lineData;

      tmp.labels = data.data.map((item: any) => item.OrderedAt);
      tmp.datasets[0].data = data.data.map((item: any) => item.TotalSales);

      this.lineData = { ...tmp };
    });
  }




}
