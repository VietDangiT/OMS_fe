import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
} from '../../interface/channel.model';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'oms-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css'],
})
export class ChannelListComponent implements OnInit, OnDestroy {
  channelService = inject(ChannelService);

  route = inject(ActivatedRoute);

  helperService = inject(HelperService);

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

  dateRange: Date[] = this.helperService.defaultDateRange;

  items: MenuItem[] = channelLabelItems;

  activeItem: MenuItem = this.items[0];

  countryId = 0;

  params: ChannelParams = {
    countryId: null,
    fromDate: null,
    toDate: null,
    keyword: tableConfig.keyword,
    limit: tableConfig.pageLimit,
    page: tableConfig.page,
    status: 0,
  };

  destroy$ = new Subject();

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.countryId = Number(params.get('countryId'));

          if (this.countryId) {
            this.handleChannelParams('countryId', this.countryId);
          } else {
            this.handleChannelParams('countryId', null);
          }

          this.getComponentData();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getComponentData(): void {
    this.getChannelData();

    this.getChannelStatus();
  }

  getChannelStatus(): void {
    this.channelService
      .getChannelStatus(this.params.countryId!)
      .pipe(
        tap(res => {
          const { channelStatus: data } = res;
          const labelItems: MenuItem[] = [];

          data.forEach(d => {
            labelItems.push({
              title: d.displayText,
              badge: d.value.toString(),
              label: d.displayText.toLowerCase(),
            });
          });

          this.items = labelItems;

          this.activeItem = this.items[0];
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

          const updatedData = data.data.map(d => {
            return {
              ...d,
              createdAt: new Date(d.createdAt!).toLocaleDateString(),
              updatedAt: new Date(d.updatedAt!).toLocaleDateString(),
            };
          });

          this.table = {
            page: data.page,
            first: data.first,
            rows: data.rows,
            pageCount: data.pageCount,
            totalRecord: data.totalRecord,
            data: {
              header: [...this.table.data.header],
              body: [...updatedData],
            },
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onPageChange(e: PageChangeEvent): void {
    this.handleChannelParams('page', e.page + tableConfig.gapPageNumber);

    this.getChannelData();
  }

  onActiveItemChange(e: MenuItem): void {
    this.activeItem = e;

    this.handleChannelParams('status', Number(this.activeItem.label));

    this.handleChannelParams('page', tableConfig.gapPageNumber);

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
    this.handleChannelParams('keyword', search);

    this.getChannelData();
  }

  handleChannelParams(
    key: keyof ChannelParams,
    value: string | number | Date | null
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
