import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';

const route:Routes = [
    {
      path: '',
      data: { breadcrumbs: ['Channels'] },
      component: ChannelListComponent,
      
    },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ChannelRoutingModule {}
