import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChannelComponent {
  items: MenuItem[];

  activeItem: MenuItem;

  ngOnInit() {
      this.items = [
        { label: 'All', id: '0',badge:"1123" },
        { label: 'Active' , id: '1', badge:"1243"},
        { label: 'Inactive', id:'2',badge:"1"},
      ];
      this.activeItem = this.items[0];
  }

  onActiveItemChange(event: any){
      this.activeItem = event;
      console.log(event);
      
  }

}
