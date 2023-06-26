import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';
import {
  ChannelByProductVariantApiResponse,
  ChannelStockApiResponse,
  StockInfo,
} from '../interfaces/inventory.component';
import { FIRST_INDEX } from 'src/app/utils/utils';

interface Channel {
  displayText: string;
  id: number;
}

const MAX_STATISTIC_VALUE = 100;
const MARKER_POSITION = -45;

@Component({
  selector: 'oms-channel-stock',
  templateUrl: './channel-stock.component.html',
  styleUrls: ['./channel-stock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChannelStockComponent {
  readonly maxStatisticValue = MAX_STATISTIC_VALUE;
  readonly markerPosition = MARKER_POSITION;
  @Input() productVariantId: number;
  stockInfo: StockInfo = {
    buffer: 0,
    inhand: 0,
    inProcess: 0,
    inStock: 0,
    onhold: 0,
    sold: 0,
    threshold: 0,
    unusable: 0,
  };
  channel: Channel[];
  selectedChannel: Channel;
  destroy$ = new Subject();

  constructor(private _inventoryService: InventoryService) {}

  ngOnInit(){
    this.getChannelByProductVariant();
  }

  getChannelByProductVariant(): void {
    if (!this.productVariantId) return;
    this._inventoryService
      .getChannelByProductVariant(this.productVariantId)
      .pipe(
        tap((res: ChannelByProductVariantApiResponse) => {
          const { channelByProductVariant: data } = res;
          this.channel = [...data];
          this.selectedChannel = this.channel[FIRST_INDEX];
          this.getChannelStockInfo();
        }),
        
        takeUntil(this.destroy$)
        )
        .subscribe();
  }

  getChannelStockInfo(): void {
    if (!this.productVariantId || !this.selectedChannel) return;
    this._inventoryService
      .getChannelStockInfo(this.productVariantId, this.selectedChannel.id)
      .pipe(
        tap((res: ChannelStockApiResponse) => {
          const { channelStockInfo: data } = res;
          this.stockInfo = data;
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  handleChannelChange() {
    this.getChannelStockInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
