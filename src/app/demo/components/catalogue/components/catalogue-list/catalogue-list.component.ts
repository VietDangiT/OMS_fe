import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import {
  catalogueHeaderTable,
  catalogueLabelItems,
} from '../../constants/catalogue.constants';
import { Catalogue, CatalogueParams } from '../../models/catalogue.models';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'oms-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss'],
})
export class CatalogueListComponent implements OnInit {
  helperService = inject(HelperService);

  catalogueService = inject(CatalogueService);

  labelItems = catalogueLabelItems;

  activeItem = this.labelItems[0];

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

  dateRange = this.helperService.defaultDateRage;

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
    this.getCatalogues();
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
        })
      )
      .subscribe();
  }

  onActiveItemChange(e: MenuItem): void {
    this.handleCatalogueParams('status', e.label!);

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
