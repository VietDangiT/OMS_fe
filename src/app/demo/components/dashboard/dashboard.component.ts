import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product, ProductCatalog } from '../../api/product';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SubMenu } from '../../interface/submenu';
import { DetailStatistic } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { DashboardService } from '../../service/dashboard.service';
import { Order } from '../../api/order';
import { environment } from 'src/environments/environment';
import { OrderedInfo } from '../../api/OrderedInfo';
import { ChartData } from 'chart.js';
import { SaleByChannelData } from './sale-by-channel/sale-by-channel.component';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  pieData: any;

  barOptions: any;

  pieOptions: any;
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
  saleByChannelData: SaleByChannelData[] = [];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  //Total Sale Chart
  totalSaleData: any;
  totalSaleOption: any;
  totalSale: number = 0;
  Months: string[] = [];
  totalSaleMonth: number[] = [];

  subMenu: SubMenu | null | undefined;

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

    this.initProductCatalogData();

    this.initSaleByChannelData();

    this.calculateTotalSale();

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }

  calculateTotalSale() {
    this.dashboardService.getOrders().subscribe((data: any) => {
      data['data'].map((src: OrderedInfo) => {
        (this.totalSale += Number(src.price)),
          this.Months.push(src.orderedAt),
          this.totalSaleMonth.push(src.price);
      });
    });
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productCatalogData = {
      labels: this.prodCatalogLabel,
      datasets: [
        {
          label: 'Total Product',
          data: this.prodCatalogData,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
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
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
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
          borderWidth: 3,
          pointStyle: false,
          pointBorderWidth: 2,
        },
      ],
    };

    this.totalSaleOption = {
      elements: {
        line: {
          tension: 0.3,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: environment.primaryColor,
            font: {
              size: 12,
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: environment.primaryColor,
            font: {
              size: 14,
            },
          },
          grid: {
            color: environment.primaryColor,
          },
        },
        y: {
          ticks: {
            color: environment.primaryColor,
            font: {
              size: 14,
            },
          },
          grid: {
            color: environment.primaryColor,
          },
        },
      },
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
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

  initSaleByChannelData() {
    this.dashboardService.getSaleByChannel().subscribe((data: any) => {
      const tmp = this.saleByChannelData;
      data.data.map((item: SaleByChannelData) => {
        tmp.push(item);
      });
      this.saleByChannelData = [...tmp];
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
