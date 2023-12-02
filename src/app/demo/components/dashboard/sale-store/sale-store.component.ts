import { Component, Input } from '@angular/core';
import { BaseChart } from '../interfaces/dashboard.models';

export interface DashboardItemPercentage {
  displayText: string;
  value: string;
  percentage: number | string;
}
@Component({
  selector: 'dashboard-sale-store',
  templateUrl: './sale-store.component.html',
  styleUrls: ['./sale-store.component.scss'],
})
export class SaleStoreComponent {
  @Input() data: BaseChart[];
}
