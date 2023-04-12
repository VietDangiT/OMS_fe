import { NgModule } from '@angular/core';
import { ChannelRoutingModule } from './channel-routing.module';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelComponent } from './channel.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ChannelRoutingModule,
    AppTopBarModule,
    FormsModule,
    TabMenuModule
  ],
  declarations: [
    ChannelComponent,
    ChannelDetailComponent
  ],
})
export class ChannelModule {}
