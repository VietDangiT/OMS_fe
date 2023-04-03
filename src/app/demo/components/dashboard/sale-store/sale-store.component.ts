import { Component, Input } from '@angular/core';

export interface SaleStore {
  channelName: string;
  actualValue: string;
  shareIn: number | string;
}
@Component({
  selector: 'dashboard-sale-store',
  templateUrl: './sale-store.component.html',
  styleUrls: ['./sale-store.component.css']
})
export class SaleStoreComponent {
  @Input() data: SaleStore[];
}
