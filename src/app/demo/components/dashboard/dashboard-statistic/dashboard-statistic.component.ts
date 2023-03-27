import { Component, Input } from '@angular/core';
import { DetailStatistic } from './detail-statistic/detail-statistic.component';

@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
})
export class DashboardStatisticComponent {
  @Input() data: DetailStatistic[] = [
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
}
