import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SubMenu } from '../../interface/submenu';
import { DetailStatistic } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { DashboardService } from '../../service/dashboard.service';
import { environment } from 'src/environments/environment';
import { OrderedInfo } from '../../api/OrderedInfo';
import { ChartData } from 'chart.js';
import { TreeMapData } from './sale-by-channel/sale-by-channel.component';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  filterArr : string[] =[
   new Date().toLocaleDateString().toString(),
   new Date().toLocaleDateString().toString()
  ];

  //Total return
  pieData: ChartData;
  pieOptions: any;
  totalReturn:number;

  barOptions: any;

  statisticData: DetailStatistic[] = [
    {
      title: 'order',
      nameManage: 'Orders',
      manageUrl: './',
      data: [
        {
          displayText: 'New Orders',
          value: 234,
        },
        {
          displayText: 'Issue',
          value: 2,
          hasCircle: true,
          circleColor: 'red',
        },
      ],
    },
    {
      title: 'product inventory',
      nameManage: 'product',
      manageUrl: './',
      data: [
        {
          displayText: '#Products Out of Stock',
          value: 12,
          hasCircle: true,
          circleColor: 'red',
        },
        {
          displayText: '#Number Products Nearly out of Stock',
          value: 2,
          hasCircle: true,
          circleColor: 'red',
        },
      ],
      hasFooter: true,
      footer: {
        displayText: 'Not Selling Products in last 3 Months',
        value: 345,
        url: './',
      },
    },
    {
      title: 'product',
      nameManage: 'product',
      manageUrl: './',
      data: [
        {
          displayText: 'Inactive',
          value: 7,
          hasCircle: true,
          circleColor: 'red',
        },
      ],
    },
    {
      title: 'channel',
      nameManage: 'channel',
      manageUrl: './',
      data: [
        {
          displayText: 'Active Channel',
          value: 9,
          hasCircle: true,
          circleColor: 'green',
        },
        {
          displayText: 'Inactive Channel',
          value: 1,
          hasCircle: true,
          circleColor: 'red',
        },
      ],
    },
  ];

  items!: MenuItem[];

  //Total Order Chart
  totalOrderData: ChartData;
  ordersLabel: any[] = [];
  ordersData: any[] = [];

  //Product Catalog Chart
  productCatalogData: ChartData;
  prodCatalogLabel: any[] = [];
  prodCatalogData: any[] = [];

  //Sale By Channel Data
  saleByChannelData: TreeMapData[] = [];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  //Total Sale Chart
  totalSaleData: any;
  totalSaleOption: any;
  totalSale: string = "0";
  Months: string[] = [];
  totalSaleMonth: number[] = [];

  filter: string[] ;

  constructor(
    public layoutService: LayoutService,
    private dashboardService: DashboardService
  ) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });
  }

  ngOnInit() {


    this.initChart();

    this.initOrderData();

    this.initPieChart();

    this.initProductCatalogData();

    this.initChartOption();

   
  }


  initPieChart(){
    this.pieData = {
      labels: ['25% Approved', '35% Pending', '40% Unapproved'],
      datasets: [
        {
          data: [25, 35, 40],
          backgroundColor: ['#213969', '#415b8c', '#2c55a0'],
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
      cutout: 75,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxHeight: 20,
            boxWidth: 20,
            padding: 20,
            usePointStyle: true,
            color: environment.primaryColor,
            font: {
              size: 12,
            },
          },
        },
      },
    };
  }

  initChart() {
  
    this.productCatalogData = {
      labels: this.prodCatalogLabel,
      datasets: [
        {
          data: this.prodCatalogData,
          fill: false,
          backgroundColor: environment.primaryColor,
          borderColor: environment.primaryColor,
          tension: 0.4,
        },
      ],
    };

    this.totalOrderData = {
      labels: this.ordersLabel,
      datasets: [
        {
          label: 'Total Sales',
          data: this.ordersData,
          fill: false,
          backgroundColor: environment.primaryColor,
          borderColor: environment.primaryColor,
          tension: 0.4,
        },
      ],
    };

    this.totalSaleData = {
      labels: this.Months,
      datasets: [
        {
          label: 'Total Sales',
          data: this.totalSaleMonth,
          fill: false,
          backgroundColor: environment.primaryColor,
          borderColor: environment.primaryColor,
          pointBorderWidth: 2,
        },
      ],
    };

   
  }

  initOrderData() {
    this.dashboardService.GetOrders().subscribe((data: any) => {
      const tmp = this.totalOrderData;

      tmp.labels = data.data.map((item: any) => item.OrderedAt);
      tmp.datasets[0].data = data.data.map((item: any) => item.OrderNumber);

      this.totalOrderData = { ...tmp };
    });
  }

  initProductCatalogData() {
    this.dashboardService.GetProductCatalogs().subscribe((data: any) => {
      const tmp = this.productCatalogData;

      tmp.labels = data.data.map((item: any) => item.OrderedAt);
      tmp.datasets[0].data = data.data.map((item: any) => item.TotalSales);

      this.productCatalogData = { ...tmp };
    });
  }

  dateFilterChanged(dateRange: Date[]){
    if(dateRange[1] != null){
      this.filterArr = dateRange.map((date:Date)=>{
        return date.toLocaleDateString("en-EN");
      })    
      this.dashboardService.getTotalSale(this.filterArr).subscribe((result: any) =>{
        this.initTotalSaleChart(result);
      })
    }
    return null;
  }

  initTotalSaleChart(result: any){
    var sale: number = 0;
    var totalArr: number[] = [];
    var labelArr: string[] = [];
    
    result.map((item: any) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.date).toLocaleDateString());
      sale += item.value;
    });
    
    this.totalSale = sale.toLocaleString('en-US');
    this.totalSaleData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Total Sales',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
          tension: 0.4,
          pointBorderWidth: 2,
        },
      ],
    };
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
