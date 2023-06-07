import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import {
  channelLabelItems,
  channelTableHeader,
} from '../../constants/channel.constants';
import {
  Channel,
  ChannelParams,
  ChannelTableApiResponse,
} from '../../interface/channel.component';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChannelListComponent implements OnInit, OnDestroy {
  table: OmsTable<Channel> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: channelTableHeader,
      body: [],
    },
  };

  dateRange: Date[] = this.helperService.defaultDateRage;

  items: MenuItem[] = channelLabelItems;

  activeItem: MenuItem = this.items[0];

  countryId = 0;

  gapPageNumber = 1;

  params: ChannelParams = {
    countryId: this.countryId,
    fromDate: this.dateRange[0],
    toDate: this.dateRange[1],
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: 0,
  };

  destroy$ = new Subject();

  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.params = {
            ...this.params,
            countryId: Number(params.get('countryId')),
          };

          this.getChannelData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getChannelData(): void {
    this.channelService
      .getChannelsTableData(this.params)
      .pipe(
        tap((res: ChannelTableApiResponse) => {
          const { channelsTableData: data } = res;

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
    this.handleChannelParams('page', e.page + this.gapPageNumber);

    this.getChannelData();
  }

  onActiveItemChange(e: MenuItem): void {
    this.activeItem = e;

    this.handleChannelParams('status', Number(this.activeItem.label));

    this.getChannelData();
  }

  dateFilterChange(dateRange: Date[]): void {
    if (dateRange[1] != null) {
      this.handleChannelParams('fromDate', dateRange[0]);

      this.handleChannelParams('toDate', dateRange[1]);

      this.getChannelData();
    }
  }

  searchValue(search: string): void {
    if (search) {
      this.handleChannelParams('keyword', search);

      this.getChannelData();
    }
  }

  handleChannelParams(
    key: keyof ChannelParams,
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
}
