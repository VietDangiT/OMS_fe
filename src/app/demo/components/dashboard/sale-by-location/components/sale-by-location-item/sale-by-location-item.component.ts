import { Component, HostBinding, Input } from '@angular/core';
import { SaleByLocation } from '../../models/sale-by-location.models';

@Component({
  selector: 'oms-sale-by-location-item',
  templateUrl: './sale-by-location-item.component.html',
  styleUrls: ['./sale-by-location-item.component.scss'],
})
export class SaleByLocationItemComponent {
  @HostBinding('class') hostClass = 'oms-sale-by-location-item';

  @Input() item: SaleByLocation;

  @Input() dateRange: Date[];
}
