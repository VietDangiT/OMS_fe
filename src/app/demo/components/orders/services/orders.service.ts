import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  labelItems: MenuItem[] = [
    { label: 'Completed', id: '0', badge: '0' },
    { label: 'Delivery', id: '1', badge: '0' },
    { label: 'Pending', id: '2', badge: '0' },
    { label: 'Failed', id: '3', badge: '0' },
    { label: 'Return', id: '4', badge: '0' },
  ];

  constructor() {}

  getLabelItems(): MenuItem[] {
    return this.labelItems;
  }
}
