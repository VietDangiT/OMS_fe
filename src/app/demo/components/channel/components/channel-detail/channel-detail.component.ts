import { Component, HostBinding, Input, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Channel } from '../../interface/channel.component';

@Component({
  selector: 'oms-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
})
export class ChannelDetailComponent {
  @HostBinding('class') hostClass = 'oms-channel-detail';

  @Input() channel: Channel;

  helperService = inject(HelperService);

  ngOnInit(): void {
    this.channel = {
      ...this.channel,
      image: this.helperService.refactorImg(
        this.helperService.arrayBufferToBase64(this.channel.image)
      ),
    };
  }
}
