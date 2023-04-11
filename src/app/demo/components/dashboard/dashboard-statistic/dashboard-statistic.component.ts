import { Component, Input, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { ChannelService } from 'src/app/demo/service/channel.service';
import { BehaviorSubject } from 'rxjs';

export interface Statistic {
  current: number,
  id: number,
  previous: number,
  value: number,
  text: string
}

@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
})
export class DashboardStatisticComponent {
  @Input() filterArr: string[];
 
  channelList: any[];
  channel: any;

  orderStatistic : Statistic[];
  productStatistic : Statistic[];
  stockStatistic: Statistic[];

  selectedChannel: string = "All Channels";

  private channelId = new BehaviorSubject<number>(0);
  channelId$ = this.channelId.asObservable();
  

  constructor(private dashboardService: DashboardService, private channelService: ChannelService) {
    this.channelService.getChannels().subscribe((channels: any)=>{
      this.channelList = channels;
    })
  }

  ngOnChanges(changes: SimpleChanges){
    const filter = changes['filterArr'].currentValue;
    this.channelId$.subscribe(id => {
      
      this.dashboardService.getOrderStatus(id, filter).subscribe((result: any)=>{
        this.orderStatistic = result;
      });

      this.dashboardService.getProductStatus(id, filter).subscribe((result: any)=>{
        this.productStatistic = result;
      });

      this.dashboardService.getStockStatus(id, filter).subscribe((result: any)=>{
        this.stockStatistic = result;
      });

    })
  }

  handleSelectChannel(id: number){
    var index = this.channelList.findIndex(channel => { return channel.id == id });
    this.channel = this.channelList[index];
    this.channelId.next(this.channel.id);
    this.selectedChannel = this.channel.name;
  }
  
  getAllChannels(){
    this.channelId.next(0);
    this.selectedChannel= "All Channels";
  }
}
 