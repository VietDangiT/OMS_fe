import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from '../../constants/table.config';
import { PageChangeEvent } from '../../interface/event';
import { HelperService } from '../../service/helper.service';
import { BaseChart } from '../dashboard/interfaces/dashboard.models';
import { OmsTable } from '../share/model/oms-table';
import {
  inventoryLabelItems,
  inventoryTableHeader,
} from './constrants/inventory.constants';
import {
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

  cardInventory: BaseChart[];

  sidebarVisible = false;

  productVariantId = 0;

  productSku = '';

  modalVisible = false;

  dateRange: Date[] = [];

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

  labelItems: MenuItem[] = inventoryLabelItems;

  activeItem: MenuItem = this.labelItems[0];

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
            this.handleInventoryParams('channelId', this.marketPlaceId);
          } else {
            this.handleInventoryParams('channelId', null);
          }

          this.getComponentData();
        })
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getOrderStatus();

    this.getInventoryData();
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
    this.handleInventoryParams('page', e.page + tableConfig.gapPageNumber);

    this.getInventoryData();
  }

  dateFilterChange(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.handleInventoryParams('fromDate', dateRange[0]);

      this.handleInventoryParams('toDate', dateRange[1]);

      this.getInventoryData();
    }
  }

  searchValue(search: string): void {
    if (search) {
      this.handleInventoryParams('keyword', search);

      this.getInventoryData();
    }
  }

  handleInventoryParams(
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

          const labelItems: MenuItem[] = [];

          data.forEach(d => {
            labelItems.push({
              title:
                this.helperService.stockStatuses[d.displayText.toLowerCase()],
              badge: d.value.toString(),
              label:
                d.displayText === 'Inactive'
                  ? d.displayText
                  : d.displayText.toLowerCase(),
            });
          });

          this.labelItems = labelItems;

          this.activeItem = this.labelItems[0];

          this.handleInventoryParams(
            'stockStatusFilter',
            this.activeItem.label!
          );

          this.getInventoryData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;
    console.log(label);

    this.handleInventoryParams('stockStatusFilter', this.activeItem.label!);

    this.getInventoryData();
  }

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
