import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../share/model/oms-table';
import {
  Inventory,
  InventoryParams,
  InventoryTableApiResponse,
} from './interfaces/inventory.component';
import {
  CHANNEL_ID,
  inventoryLabelItems,
  inventoryTableHeader,
} from './constrants/inventory.constrants';
import { tableConfig } from '../../constants/table.config';
import { Subject, takeUntil, tap } from 'rxjs';
import { InventoryService } from './services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../service/helper.service';
import { PageChangeEvent } from '../../interface/event';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryComponent implements OnInit {
  @Input() inventory: Inventory;
  sidebarVisible: boolean = false;
  productVariantId: number;
  productSku: string;
  modalVisible: boolean;
  table: OmsTable<Inventory> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: inventoryTableHeader,
      body: [],
    },
  };

  dateRange: Date[] = this.helperService.defaultDateRange;

  items: MenuItem[] = inventoryLabelItems;

  activeItem: MenuItem = this.items[0];

  channelId = CHANNEL_ID;

  params: InventoryParams = {
    channelId: this.channelId,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: 0,
  };

  destroy$ = new Subject();

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.params = {
            ...this.params,
            channelId: Number(params.get('channelId')),
          };

          this.getInventoryData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getInventoryData(): void {
    this.inventoryService
      .getInventoryTableData(this.params)
      .pipe(
        tap((res: InventoryTableApiResponse) => {
          const { products: data } = res;
          this.table = {
            page: data.page,
            first: data.first,
            rows: data.rows,
            pageCount: data.pageCount,
            totalRecord: data.totalRecord,
            data: {
              header: [...this.table.data.header],
              body: [...data.data],
            },
          };
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleChannelParams('page', e.page + tableConfig.gapPageNumber);

    this.getInventoryData();
  }

  onActiveItemChange(e: MenuItem): void {
    this.activeItem = e;

    this.handleChannelParams('status', Number(this.activeItem.label));

    this.getInventoryData();
  }

  dateFilterChange(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.handleChannelParams('fromDate', dateRange[0]);

      this.handleChannelParams('toDate', dateRange[1]);

      this.getInventoryData();
    }
  }

  searchValue(search: string): void {
    if (search) {
      this.handleChannelParams('keyword', search);

      this.getInventoryData();
    }
  }

  handleChannelParams(
    key: keyof InventoryParams,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }

  handleClickActions(productVariantId: number, productSku: string){
    this.productSku = productSku;
    this.productVariantId = productVariantId;
    this.sidebarVisible = true;
  }
}
