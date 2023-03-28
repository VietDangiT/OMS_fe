import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-sale-by-channel',
  templateUrl: './sale-by-channel.component.html',
  styleUrls: ['./sale-by-channel.component.scss'],
})
export class SaleByChannelComponent {
  data = {
    labels: ['TotalSales'],
    datasets: [
      {
        label: 'Total Sales',
        data: [23, 32, 74, 43, 88, 19, 44, 34, 75, 93, 44],
        backgroundColor: '#213969',
        borderColor: '#000',
      },
    ],
  };

}
