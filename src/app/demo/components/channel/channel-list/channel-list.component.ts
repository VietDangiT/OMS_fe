import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { ChannelService } from 'src/app/demo/service/channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChannelListComponent {
  items: MenuItem[] = [
    { label: 'All', id: '0',badge:"1123" },
    { label: 'Active' , id: '1', badge:"1243"},
    { label: 'Inactive', id:'2',badge:"1"},
  ];
  activeItem: MenuItem = this.items[0];
  countryId: string | number;
 
  constructor(private channelService: ChannelService, private route: ActivatedRoute) {
    this.route.queryParamMap.pipe(
      tap(params => {
        this.countryId = params.get('countryId') || 0; 
        console.log(this.countryId);
        
      })
    ).subscribe()    
  }

  ngOnInit() {
  }

  onActiveItemChange(event: any){
      this.activeItem = event;
  }


  dateFilterChange(dateRange: Date[]){
    console.log(dateRange);
    
  }
  searchValue(search: any){
    console.log(search);
  }
}
