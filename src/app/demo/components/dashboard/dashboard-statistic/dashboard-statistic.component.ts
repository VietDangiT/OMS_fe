import { Component, Input } from '@angular/core';
import { DetailStatistic } from './detail-statistic/detail-statistic.component';

@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
})
export class DashboardStatisticComponent {
  @Input() data: DetailStatistic[] = [];
  statisticData: DetailStatistic[] = [
    {
      title: 'order',
      data: [
        {
          displayText: 'New Orders',
          value: 234,
          percent : '25%',
          circleColor: 'success',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity: 'pi pi-arrow-up',
        },
        {
          displayText: 'Issue',
          value: 2,
          circleColor: 'danger',
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
          circleColor: 'success',
          percent:'25%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-up',
        },
        {
          displayText: 'Problem',
          value: 2,
          circleColor: 'danger',
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
          value: 2331423423423424,
          circleColor: 'success',
          percent:'25%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-up',
        },
        {
          displayText: 'Restock now',
          value: 2,
          circleColor: 'danger',
          percent:'13%',
          hasCircle:true,
          hasArrow:true,
          ArrowActivity : 'pi pi-arrow-down'
        },
      ],
    },
  ];
}
 