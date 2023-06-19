import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { catalogueHeaderTable } from '../../constants/catalogue.constants';
import { Catalogue, CatalogueParams } from '../../models/catalogue.models';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'oms-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatalogueListComponent implements OnInit {
  helperService = inject(HelperService);

  catalogueService = inject(CatalogueService);

  route = inject(ActivatedRoute);

  labelItems: MenuItem[] = [];

  activeItem: MenuItem;

  tableData: OmsTable<Catalogue> = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0,
    totalRecord: 0,
    data: {
      header: catalogueHeaderTable,
      body: [],
    },
  };

  dateRange = this.helperService.defaultDateRange;

  destroy$ = new Subject();

  channelId = 0;

  params: CatalogueParams = {
    channelId: null,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: 'Active',
  };

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.channelId = Number(params.get('marketplaceId'));

          if (this.channelId) {
            this.handleCatalogueParams('channelId', this.channelId);
          }

          this.getCatalogues();

          this.getProductStatus();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getCatalogues(): void {
    this.catalogueService
      .getCatalogues(this.params)
      .pipe(
        tap(res => {
          const { products: data } = res;

          const { first, page, pageCount, rows, totalRecord } = data;

          this.tableData = {
            first,
            page,
            pageCount,
            rows,
            totalRecord,
            data: {
              header: [...this.tableData.data.header],
              body: [...data.data],
            },
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getProductStatus(): void {
    this.catalogueService
      .getProductStatus(this.params.channelId!)
      .pipe(
        tap(res => {
          const { productStatus: data } = res;
          const labelItems: MenuItem[] = [];

          data.forEach(d => {
            labelItems.push({
              title: d.displayText,
              badge: d.value.toString(),
              label: d.displayText.toLowerCase(),
            });
          });

          this.labelItems = labelItems;

          this.activeItem = this.labelItems[0];
        })
      )
      .subscribe();
  }

  onActiveItemChange(e: MenuItem): void {
    this.handleCatalogueParams('status', e.label!);

    this.handleCatalogueParams('page', tableConfig.gapPageNumber);

    this.getCatalogues();
  }

  dateFilterChange(dates: Date[]): void {
    if (dates[1] !== null) {
      this.handleCatalogueParams('fromDate', dates[0]);

      this.handleCatalogueParams('toDate', dates[1]);

      this.getCatalogues();
    }
  }

  searchValue(val: string): void {
    this.handleCatalogueParams('keyword', val);

    this.getCatalogues();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleCatalogueParams('page', e.page + tableConfig.gapPageNumber);

    this.getCatalogues();
  }

  handleCatalogueParams(
    key: keyof CatalogueParams,
    value: string | number | Date
  ): void {
    this.params = {
      ...this.params,
      [key]: value,
    };
  }
}
