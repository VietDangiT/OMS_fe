import { Component } from '@angular/core';
import { SaleOnChannel } from '../interfaces/sale-on-channel';

@Component({
  selector: 'app-total-sale-by-location',
  templateUrl: './total-sale-by-channel.component.html',
  styleUrls: ['./total-sale-by-channel.component.css'],
})
export class TotalSaleByLocationComponent {
  saleOnChannelData: SaleOnChannel = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.3,
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: 0.3,
      },
      {
        label: 'Third Dataset',
        data: [30, 20, 30, 40, 50, 60, 90],
        fill: false,
        borderColor: '#FFF123',
        tension: 0.3,
      },
    ],
  };
}
