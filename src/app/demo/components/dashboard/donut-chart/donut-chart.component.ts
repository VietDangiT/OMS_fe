import { Component } from '@angular/core';



@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent {

  pieData: any;

  pieOptions: any;

  ngOnInit() {
    this.initCharts();
}
  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.pieData = {
      labels: ['25% Approved', '35% Pending', '40% Unapproved'],
      datasets: [
          {
              data: [25, 35, 40],
              backgroundColor: ['#213969','#415b8c', '#2c55a0', ],
              hoverBackgroundColor: ['#213969','#415b8c', '#2c55a0']
          }]
  };
  this.pieOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      cutout:'75%',
      radius:'100%',
      plugins: {
          legend: {
              position: 'right',
              labels: {         
                boxHeight: 20,
                boxWidth: 20,
                padding: 20,       
                usePointStyle: true,
                color: textColor,
                font:{
                  size: 10,
                }
              }
          }
      }
    };
  } 
}
