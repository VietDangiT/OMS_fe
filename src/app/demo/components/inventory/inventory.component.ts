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
  CardInventory,
  CardInventoryApiResponse,
  Inventory,
  InventoryParams,
  InventoryTableApiResponse,
} from './interfaces/inventory.component';
import {
  CHANNEL_ID,
  inventoryLabelItems,
  inventoryTableHeader,
} from './constrants/inventory.constants';
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
  available:number= 0;
  cardInventory:CardInventory;
  sidebarVisible: boolean = false;
  productVariantId: number;
  productSku: string;
  modalVisible: boolean;
  countInventory:Inventory[];
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
  apiUrl = "https://localhost:7121/api";
  dateRange: Date[] = this.helperService.defaultDateRange;
  dateFilterValue: string[];
  labelItems: MenuItem[] = inventoryLabelItems;
  activeItem: MenuItem = this.labelItems[0];
  gapPageNumber = 1;
  marketPlaceId = 0;
  params: InventoryParams = {
    channelId: null,
    stockStatusFilter: '',
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
  };

  destroy$ = new Subject();

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
        this.getInventoryData();
        this.getListCardsComponent();
        this.getOrderStatus();
  }
  getInventoryData(): void {
    this.inventoryService
    .getInventoryTableData(this.params)
    .pipe(
      tap(res => {
        const { products } = res;


        this.table = {
          data: {
            header: [...this.table.data.header],
            body: [...products.data],
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
 // filter
  getListCardsComponent():void {
    this.inventoryService.getCardInventory()
    .pipe(
      tap((res : CardInventoryApiResponse)=> {
      const  {productStatistic : cardInventory } = res;
      this.cardInventory = cardInventory;
    })
    )
    .subscribe();
  }

  getOrderStatus(): void {
    this.inventoryService
      .getCardInventory()
      .pipe(
        tap((res : CardInventoryApiResponse)=> {
          const  {productStatistic : data } = res;
          const entries = Object.entries(data);
          console.log(entries);
          const labelItems: MenuItem[] = [];
          let total = 0;
          entries.forEach(d => {
            if(d[0] !== '__typename'){
            labelItems.push({
              title: d[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toLocaleUpperCase(); }),
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
}
