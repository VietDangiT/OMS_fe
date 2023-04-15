import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { BehaviorSubject, Subject, forkJoin, switchMap, takeUntil, tap } from 'rxjs';
import { Statistic } from '../interfaces/interfaces';
import { ChannelService } from 'src/app/demo/service/channel.service';
import { Channel } from '../../channel/interface/channel.component';



@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardStatisticComponent {
  @Input() filterArr: string[];
 
  channelList: Channel[];
  channel: Channel;
  selectedChannel: Channel = {
    name:"All channels",
    description:"",
    id:0,
    number:0
  }

  orderStatistic : Statistic[];
  productStatistic : Statistic[];
  stockStatistic: Statistic[];

  private channelId = new BehaviorSubject<number>(0);
  private channelId$ = this.channelId.asObservable();
  private changes$ = new Subject();

  constructor(private _dashboardService: DashboardService, private _channelService: ChannelService) {
    this._channelService.getActiveChannels()
    .pipe(
      tap((channels: Channel[])=>{
        channels.unshift(this.selectedChannel);
        this.channelList = channels;
      })
    )
    .subscribe()
  }

  ngOnChanges(changes: SimpleChanges){
    const filter = changes['filterArr'].currentValue;
    this.changes$.next('');
    this.channelId$
    .pipe( 
        switchMap((id: number)=> {
        
        const order$ = this._dashboardService.getOrderStatus(id, filter).pipe(
          tap((result: Statistic[])=>{
            this.orderStatistic = result;
          }));
          
        const product$ = this._dashboardService.getProductStatus(id, filter).pipe(
          tap((result: Statistic[])=>{
            this.productStatistic = result;
          }));

        const stock$ = this._dashboardService.getStockStatus(id, filter).pipe(
          tap((result: Statistic[])=>{
            this.stockStatistic = result;
          }));

        return forkJoin([order$, product$, stock$])
      }),
    takeUntil(this.changes$)  
    ).subscribe();
  }

  handleSelectChannel(id: number){
    var index = this.channelList.findIndex(channel => { return channel.id === id });
    this.channel = this.channelList[index];
    this.channelId.next(this.channel.id);
    this.selectedChannel = {...this.channel};
  }
  
  
}
 