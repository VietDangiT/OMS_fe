import { Component, Input } from '@angular/core';
import { Channel } from '../../interface/channel.component';

@Component({
  selector: 'oms-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
})
export class ChannelDetailComponent {
  @Input() channel: Channel;
}
