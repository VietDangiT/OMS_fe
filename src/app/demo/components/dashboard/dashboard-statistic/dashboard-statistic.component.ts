import { Component, Input, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { ChannelService } from 'src/app/demo/service/channel.service';
import { BehaviorSubject, tap } from 'rxjs';
import { Statistic } from '../interfaces/interfaces';



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
    this.channelService.getChannels()
    .pipe(
      tap((channels: any)=>{
        this.channelList = channels;
      })
    )
    .subscribe()
  }

  ngOnChanges(changes: SimpleChanges){
    const filter = changes['filterArr'].currentValue;
    this.channelId$
    .pipe(
      tap((id: number)=> {
        console.log("id"+id);
        console.log("filter"+filter);
        
        this.dashboardService.getOrderStatus(id, filter).pipe(
          tap((result: any)=>{
            this.orderStatistic = result;            
          })
        ).subscribe();
  
        this.dashboardService.getProductStatus(id, filter).pipe(
          tap((result: any)=>{
            this.productStatistic = result;
          })
        ).subscribe();
  
        this.dashboardService.getStockStatus(id, filter).pipe(
          tap((result: any)=>{
            this.stockStatistic = result;
          })
        ).subscribe();
      })
    ).subscribe();
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
 