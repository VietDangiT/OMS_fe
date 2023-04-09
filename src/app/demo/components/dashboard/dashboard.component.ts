import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DetailStatistic } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { DashboardService } from '../../service/dashboard.service';
import { environment } from 'src/environments/environment';
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
  totalReturn: string = "0";

  barOptions: any;

  statisticData: DetailStatistic[] = [
    {
      title: 'order',
      data: [
        {
          displayText: 'New Orders',
          value: 234,
          percent : '25%',
          circleColor: '#117B34FF',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity: 'pi pi-arrow-up',
        },
        {
          displayText: 'Issue',
          value: 2,
          circleColor: '#FCA310FF',
          percent: '13%',
          hasCircle: true,
          hasArrow:true,
          ArrowActivity:'pi pi-arrow-down'


        },
      ],
    },
    {
      title: 'Product',
      data: [
        {
          displayText: 'Active',
          value: 234,
          circleColor: '#117B34FF',
          percent:'25%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-up',
        },
        {
          displayText: 'Problem',
          value: 2,
          circleColor: '#FCA310FF',
          percent: '13%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity:'pi pi-arrow-down'
        },
      ],

      
    },
    {
      title: 'STOCK STATUS',
      data: [
        {
          displayText: 'Restock soon',
          value: 234,
          circleColor: '#117B34FF',
          percent:'25%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-up',
        },
        {
          displayText: 'Restock now',
          value: 2,
          circleColor: '#FCA310FF',
          percent:'13%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-down'
        },
      ],
    },
  ];

  items!: MenuItem[];

  //Total Order Chart
  totalOrderData: ChartData;
  ordersLabel: any[] = [];
  ordersData: any[] = [];
  totalOrder: string = "0";

  //Product Catalog Chart
  productCatalogData: ChartData;
  prodCatalogLabel: any[] = [];
  prodCatalogData: any[] = [];
  productVariantId: number = 0;

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



    this.initChartOption();
   
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
      cutout: 100,
      plugins: {
        legend: {
          position: 'bottom' ,
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

  dateFilterChanged(dateRange: Date[]){
    if(dateRange[1] != null){
      this.filterArr = dateRange.map((date:Date)=>{
        return date.toLocaleDateString("en-EN");
      });

      
      // this.dashboardService.getProductCatalogs(this.productVariantId, this.filterArr).subscribe((result: any) =>{
      //   console.log(result);
      // })

      this.dashboardService.getTotalSale(this.filterArr).subscribe((result: any) =>{
        this.initTotalSaleChart(result);
      });

      this.dashboardService.getTotalReturn(this.filterArr).subscribe((result: any) => {
        this.initTotalReturnChart(result);
      }); 

      this.dashboardService.getTotalOrder(this.filterArr).subscribe((result:any) =>{
        this.initTotalOrderChart(result);
      })
    }
    return null;
  }

  initTotalReturnChart(result: any){
    var labelArr: string[] = [];
        var dataArr : number[] = [];
        var total : number = 0;
        result.map((item:any)=>{
          labelArr.push(`${item.value.toFixed(0)}% ${item.text}`);
          dataArr.push(item.numberOfReturn);
          total += item.numberOfReturn;
        });
        this.totalReturn = total.toLocaleString('en-US');
        this.pieData = {
          labels: labelArr,
          datasets: [
            {
              data: dataArr,
              backgroundColor: [environment.primaryColor, environment.secondaryColor, environment.thirdColor],
              hoverBackgroundColor: [environment.primaryColor, environment.secondaryColor, environment.thirdColor],
            },
          ],
        };
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

  initTotalOrderChart(result: any){
    var totalArr: number[] = [];
        var labelArr: string[] = [];
        var order: number = 0;
        result.map((item: any) => {
          totalArr.push(item.value);
          labelArr.push(new Date(item.text).toLocaleDateString());
          order += item.value;
        });
        
        this.totalOrder = order.toLocaleString('en-US');
        this.totalOrderData = {
          labels: labelArr,
          datasets: [
            {
              label: 'Total Orders',
              data: totalArr,
              borderColor: environment.primaryColor,
              backgroundColor: environment.primaryColor,
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
