import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { ShareModule } from '../share/share.module';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelComponent } from './channel.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule,
    AppTopBarModule,
    FormsModule,
    TabMenuModule,
    CalendarModule,
    ShareModule,
    InputSwitchModule,
  ],
  declarations: [
    ChannelComponent,
    ChannelDetailComponent,
    ChannelListComponent,
  ],
})
export class ChannelModule {}
