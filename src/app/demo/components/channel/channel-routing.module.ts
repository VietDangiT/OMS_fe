import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';

const route:Routes = [
    {
      path: '',
      data: { breadcrumbs: ['Channels'] },
      component: ChannelComponent,
      children:[ {
        path: ':channelname',
        data: {breadcrumbs: ['Channels']},
        component: ChannelDetailComponent
       }]
    },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ChannelRoutingModule {}
