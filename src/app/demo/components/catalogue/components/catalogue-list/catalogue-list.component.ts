import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import {
  catalogueHeaderTable,
  catalogueLabelItems,
} from '../../constants/catalogue.constants';
import { Catalogue } from '../../models/catalogue.models';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'oms-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss'],
})
export class CatalogueListComponent {
  labelItems: MenuItem[] = catalogueLabelItems;

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

  dateRange = [this.helperService.addDays(new Date(), -7), new Date()];

  constructor(
    private helperService: HelperService,
    private catalogueService: CatalogueService
  ) {}

  onActiveItemChange(e: MenuItem): void {}

  dateFilterChange(date: Date[]): void {}

  searchValue(val: string): void {}

  onPageChange(e: PageChangeEvent): void {}
}
