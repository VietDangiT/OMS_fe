import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { map } from 'rxjs';
import { tableConfig } from 'src/app/demo/constants/table.config';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { PagingInfo } from '../../../share/model/paginginfo';
import { storeTableHeader } from '../../constants/channel.constants';
import { Channel, Store } from '../../interface/channel.model';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'oms-channel-dialog',
  templateUrl: './channel-dialog.component.html',
  styleUrls: ['./channel-dialog.component.scss'],
})
export class ChannelDialogComponent {
  @Input() visible: boolean;

  @Input() channel: Channel;

  @Output('onClose') onClose = new EventEmitter();

  channelService = inject(ChannelService);

  helperService = inject(HelperService);

  tableData: OmsTable<Store> = {
    data: {
      header: storeTableHeader,
      body: [
        {
          storeImage: '',
          date: new Date(),
          displayText: '',
          location: '',
          totalOrders: 0,
          totalSale: 0,
        },
      ],
    },
  };

  page = tableConfig.page;

  limit = tableConfig.pageLimit;

  stores: Store[] = [];

  ngOnInit(): void {
    this.getStores();
  }

  getStores(): void {
    this.channelService
      .getStores(this.channel.id, this.page, this.limit)
      .pipe(
        map(res => {
          const { storesFromChannel: data } = res;

          const { first, page, pageCount, totalRecord, rows } = data;

          const updatedData = data.data.map(d => {
            return {
              ...d,
              date: new Date(d.date!).toLocaleDateString(),
              storeImage: this.helperService.refactorImg(d.storeImage),
            };
          });

          this.tableData = {
            first,
            page,
            pageCount,
            totalRecord,
            rows,
            data: {
              header: [...this.tableData.data.header],
              body: [...updatedData],
            },
          };
        })
      )
      .subscribe();
  }

  pagingInfo(e: PagingInfo): void {
    this.page = e.page + tableConfig.gapPageNumber;

    this.getStores();
  }

  closeModal() {
    this.onClose.emit();
  }
}
