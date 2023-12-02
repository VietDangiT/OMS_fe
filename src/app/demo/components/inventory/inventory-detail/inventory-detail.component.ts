import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OmsTable } from '../../share/model/oms-table';
import {
  ListedStockOnChannel,
  ListedStockOnChannelApiResponse,
  ProductInventoryInfoApiResponse,
} from '../interfaces/inventory.models';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'oms-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryDetailComponent {
  @Input() productVariantId: number;
  @Input() isSidebarShow: boolean;
  apiUrl = environment.apiUrl;
  numberListedOnChannel: number = 0;
  destroy$ = new Subject();
  table: OmsTable<ListedStockOnChannel> = {
    data: {
      header: [],
      body: [],
    },
  };

  constructor(private _inventoryService: InventoryService) {}

  ngOnInit() {
    this.getInventoryData();
    this.getProductInventoryInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['productVariantId'].currentValue !==
      changes['productVariantId'].previousValue
    ) {
      this.getInventoryData();
      this.getProductInventoryInfo();
    }
  }

  getInventoryData(): void {
    if (!this.productVariantId) return;
    this._inventoryService
      .getListedProductOnChannelInfo(this.productVariantId)
      .pipe(
        tap((res: ListedStockOnChannelApiResponse) => {
          const { listedProductOnChannelInfo: data } = res;
          this.table = {
            data: {
              header: this.table.data.header,
              body: [...data],
            },
          };
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getProductInventoryInfo(): void {
    if (!this.productVariantId) return;
    this._inventoryService
      .getProductInventoryInfo(this.productVariantId)
      .pipe(
        tap((res: ProductInventoryInfoApiResponse) => {
          const { productInventoryInfo: data } = res;
          this.numberListedOnChannel = data;
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
