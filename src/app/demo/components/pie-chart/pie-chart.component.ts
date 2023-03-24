import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: ['25% Approved', '35% Pending', '40% Unapproved'],
        datasets: [
          {
            data: [25, 35, 40],
            backgroundColor: ['#007EC6', '#7595D4', '#B4C5E7'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: '75%',
        radius: '70',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxHeight: 20,
              boxWidth: 20,
              padding: 25,
              usePointStyle: true,
              font: {
                size: 11, // adjust the font size of the labels
              },
            },
          },
          
        }
        
      },
    });
  }
}


