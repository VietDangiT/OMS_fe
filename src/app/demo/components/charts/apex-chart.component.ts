import { Component } from "@angular/core";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle } from "ng-apexcharts";

export type heatChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    colors: any;
  };

@Component({
    selector: 'app-apex-chart',
    templateUrl: './apex-chart.component.html',
  })
  export class ApexChartComponent {
    heatChartOptions: Partial<heatChartOptions> | any;
    ngOnInit(){
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
  }