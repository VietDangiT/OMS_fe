import { Component, Input } from '@angular/core';
import { TotalSaleByChannel } from '../../models/total-sale-by-channel.models';

@Component({
  selector: 'oms-total-sale-by-channel-item',
  templateUrl: './total-sale-by-channel-item.component.html',
  styleUrls: ['./total-sale-by-channel-item.component.scss'],
})
export class TotalSaleByChannelItemComponent {
  @Input() rowData: TotalSaleByChannel;
}
