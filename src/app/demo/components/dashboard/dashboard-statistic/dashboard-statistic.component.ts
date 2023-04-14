import { Component, Input, SimpleChanges } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { BehaviorSubject, Subject, forkJoin, switchMap, takeUntil, tap } from 'rxjs';
import { Statistic } from '../interfaces/interfaces';
import { ChannelService } from 'src/app/demo/service/channel.service';



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

  private changes$ = new Subject();
  

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
    this.changes$.next('');
    this.channelId$
    .pipe( 
        switchMap((id: number)=> {
        
        const order$ = this.dashboardService.getOrderStatus(id, filter).pipe(
          tap((result: any)=>{
            this.orderStatistic = result;            
          }));
          
        const product$ = this.dashboardService.getProductStatus(id, filter).pipe(
          tap((result: any)=>{
            this.productStatistic = result;
          }));

        const stock$ = this.dashboardService.getStockStatus(id, filter).pipe(
          tap((result: any)=>{
            this.stockStatistic = result;
          }));

        return forkJoin([order$, product$, stock$])
      }),
    takeUntil(this.changes$)  
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
 