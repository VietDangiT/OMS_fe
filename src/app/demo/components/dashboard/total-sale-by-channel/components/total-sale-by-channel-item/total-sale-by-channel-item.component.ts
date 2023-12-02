import { Component, HostBinding, Input, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { TotalSaleByChannel } from '../../models/total-sale-by-channel.models';

@Component({
  selector: 'oms-total-sale-by-channel-item',
  templateUrl: './total-sale-by-channel-item.component.html',
  styleUrls: ['./total-sale-by-channel-item.component.scss'],
})
export class TotalSaleByChannelItemComponent {
  @HostBinding('class') hostClass = 'oms-total-sale-by-channel-item';

  @Input() rowData: TotalSaleByChannel;

  helperService = inject(HelperService);

  ngOnInit(): void {
    this.refactorData();
  }

  refactorData(): void {
    this.rowData = {
      ...this.rowData,
      channelImage: this.helperService.prefixImgSrc(this.rowData.channelImage),
    };
  }
}
