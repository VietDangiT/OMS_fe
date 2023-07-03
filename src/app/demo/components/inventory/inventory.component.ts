import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from '../../constants/table.config';
import { PageChangeEvent } from '../../interface/event';
import { HelperService } from '../../service/helper.service';
import { OmsTable } from '../share/model/oms-table';
import {
  inventoryLabelItems,
  inventoryTableHeader,
} from './constrants/inventory.constants';
import {
  CardInventory,
  CardInventoryApiResponse,
  Inventory,
  InventoryParams,
} from './interfaces/inventory.models';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryComponent implements OnInit {
  @Input() inventory: Inventory;
  available: number = 0;
  cardInventory: CardInventory;
  sidebarVisible: boolean = false;
  productVariantId: number;
  productSku: string;
  modalVisible: boolean;
  countInventory: Inventory[];
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
  dateRange: Date[] = [];
  dateFilterValue: string[];
  labelItems: MenuItem[] = inventoryLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  gapPageNumber = 1;
  marketPlaceId = 0;
  params: InventoryParams = {
    channelId: null,
    stockStatusFilter: '',
    fromDate: null,
    toDate: null,
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  destroy$ = new Subject();

  constructor(
    private inventoryService: InventoryService,
    private helperService: HelperService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParamMap
      .pipe(
        tap(params => {
          this.marketPlaceId = Number(params.get('marketplaceId'));

          if (this.marketPlaceId) {
            this.handleChannelParams('channelId', this.marketPlaceId);
          } else {
            this.handleChannelParams('channelId', null);
          }

          this.getComponentData();
        })
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getInventoryData();

    this.getOrderStatus();
  }

  getInventoryData(): void {
    this.inventoryService
      .getInventoryTableData(this.params)
      .pipe(
        tap(res => {
          const { products } = res;

          const updatedData = products.data.map(d => {
            return {
              ...d,
              productVariantImage: this.helperService.prefixImgSrc(
                d.productVariantImage!
              ),
            };
          });

          this.table = {
            data: {
              header: [...this.table.data.header],
              body: [...updatedData],
            },
            first: products.first,
            page: products.page,
            pageCount: products.pageCount,
            rows: products.rows,
            totalRecord: products.totalRecord,
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
    value: string | number | Date | null
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }

  handleClickActions(productVariantId: number, productSku: string) {
    this.productSku = productSku;
    this.productVariantId = productVariantId;
    this.sidebarVisible = true;
  }

  getOrderStatus(): void {
    this.inventoryService
      .getCardInventory(this.params.channelId!)
      .pipe(
        tap((res: CardInventoryApiResponse) => {
          const { productStatistic: data } = res;

          this.cardInventory = data;

          const entries = Object.entries(data);
          const labelItems: MenuItem[] = [];
          let total = 0;
          entries.forEach(d => {
            if (d[0] !== '__typename') {
              labelItems.push({
                title: d[0]
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, function (str) {
                    return str.toLocaleUpperCase();
                  }),
                badge: d[1].toString(),
                label: d[0].toLowerCase(),
              });

              total += d[1];
            }
          });

          this.labelItems = labelItems;
          inventoryLabelItems[0].badge = total.toString();
          this.labelItems.unshift(inventoryLabelItems[0]);
          this.activeItem = this.labelItems[0];
        })
      )
      .subscribe();
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;

    this.handleChannelParams('stockStatusFilter', this.activeItem.label!);

    this.getInventoryData();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
