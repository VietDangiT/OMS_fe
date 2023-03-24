import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements OnInit {
  basicData: any;
  basicOptions!: ChartOptions;
  // SetNon: any;
  // @Input() option: any;
  ngOnInit(): void {
    this.basicData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Total Sales',
          data: [1200, 950, 850, 720, 620, 540, 400],
          fill: false,
          backgroundColor: '#213969',
          borderColor: '#213969',
          borderWidth: 3,
          pointStyle: false,
          pointBorderWidth: 2,
        },
      ],
    };
    // this.SetNon = {
    //   elements: {
    //     line: {
    //       tension: 0.3,
    //     },
    //   },
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   plugins: {
    //     legend: {
    //       labels: {
    //         color: '#ffffff',
    //       },
    //     },
    //   },
    //   scales: {
    //     display:false,
    //     x: {
    //       ticks: {
    //         color: '#000000',

    //       },
    //       grid: {
    //         color: '#ffffff',
    //       },
    //     },
    //     y: {
    //       ticks: {
    //         color: '#ffffff',
    //       },
    //       grid: {
    //         color: '#f4f4f5',
    //       },
    //     },
    //   },
    // };
    this.basicOptions  = {
      elements: {
        line: {
          tension: 0.3,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio:1,
      plugins: {
        legend: {
          labels: {
            color: '#000000',
            font: {
              size: 12,
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#000000',
            font: {
              size: 14,
            },
          },
          grid: {
            color: '#cbd5e1',
          },
        },
        y: {
          ticks: {
            color: '#000000',
            font: {
              size: 14,
            },
          },
          grid: {
            color: '#cbd5e1',
          },
        },
      },
    };
  }
}
