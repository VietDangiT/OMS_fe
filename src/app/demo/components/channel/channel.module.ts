import { NgModule } from '@angular/core';
import { ChannelRoutingModule } from './channel-routing.module';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelComponent } from './channel.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { CalendarModule } from 'primeng/calendar';
import { ShareModule } from '../share/share.module';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule,
    AppTopBarModule,
    FormsModule,
    TabMenuModule,
    CalendarModule,
    ShareModule,
    InputSwitchModule
  ],
  declarations: [
    ChannelComponent,
    ChannelDetailComponent,
    ChannelListComponent
  ],
})
export class ChannelModule {}
