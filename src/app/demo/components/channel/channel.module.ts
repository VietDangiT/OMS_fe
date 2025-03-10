import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { AvatarComponent } from '../share/avatar/avatar.component';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelComponent } from './channel.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { ChannelDialogComponent } from './components/channel-dialog/channel-dialog.component';
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
    TabMenuComponent,
    AvatarComponent,
    DialogModule,
  ],
  declarations: [
    ChannelComponent,
    ChannelDetailComponent,
    ChannelListComponent,
    ChannelDialogComponent,
  ],
})
export class ChannelModule {}
