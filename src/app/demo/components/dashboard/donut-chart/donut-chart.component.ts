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
              backgroundColor: ['#007EC6', '#7595D4', '#B4C5E7'],
              hoverBackgroundColor: ['#007EC6', '#7595D4', '#B4C5E7']
          }]
  };
  this.pieOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      cutout:'75%',
      radius:'70%',
      plugins: {
          legend: {
              position: 'left',
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
  };
  }

}
