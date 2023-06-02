import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { PageChangeEvent } from 'src/app/demo/interface/event';
import { ChannelService } from 'src/app/demo/service/channel.service';
import { OmsTable } from '../../../share/model/oms-table';
import { Channel } from '../../interface/channel.component';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChannelListComponent {
  channelStatus: boolean[] = [];

  table: OmsTable<Channel> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        { field: 'channel', col: 'Channel' },
        { field: 'numberOfOrders', col: 'Number Of Orders' },
        { field: 'totalSales', col: 'Total Sales' },
        { field: 'status', col: 'Status' },
        { field: 'createdAt', col: 'Created At' },
        { field: 'updatedAt', col: 'Updated At' },
      ],
      body: [],
    },
  };

  items: MenuItem[] = [
    { label: '', id: '0', badge: '0', title: 'All' },
    { label: 'active', id: '1', badge: '0', title: 'Active' },
    { label: 'inactive', id: '2', badge: '0', title: 'Inactive' },
  ];

  activeItem: MenuItem = this.items[0];

  countryId: string | number;

  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .pipe(
        tap(params => {
          this.countryId = params.get('countryId') || 0;
          console.log(this.countryId);
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  getChannelData = (
    rows: number,
    currentPage: number = 1,
    search: string = '',
    countryId: number = 0,
    status: string = ''
  ) => {
    this.channelService
      .getChannelList(rows, currentPage, search, countryId, status)
      .pipe(
        tap((item: any) => {
          this.table = {
            page: item.page,
            first: item.first,
            rows: item.rows,
            pageCount: item.pageCount,
            totalRecord: item.totalRecord,
            data: {
              header: [...this.table.data.header],
              body: [...item.data],
            },
          };
          this.channelStatus.length = 0;
          this.channelStatus = this.table.data.body.map((element: any) =>
            element.status === 'ACTIVE' ? true : false
          );
          console.log(this.channelStatus);
        })
      )
      .subscribe();
  };

  onPageChange(event: PageChangeEvent) {
    if (event.page === 0) {
      event.page = 1;
    }

    this.getChannelData(event.row, event.page);
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
  }

  dateFilterChange(dateRange: Date[]) {
    console.log(dateRange);
  }

  searchValue(search: string) {
    this.getChannelData(this.table.rows!);
  }

  trackByIndex(index: number, obj: unknown): unknown {
    console.log(index, obj);

    return index;
  }
}
