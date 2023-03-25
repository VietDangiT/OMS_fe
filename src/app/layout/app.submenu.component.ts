import { Component, Input} from '@angular/core';
import { SubMenu } from '../demo/interface/submenu';
import { LayoutService } from './service/app.layout.service';



@Component({
  selector: 'app-submenu',
  templateUrl: './app.submenu.component.html',
})
export class SubmenuComponent {
  @Input() subMenu: SubMenu = {
    title:"Dashboard",
   items: [
    {
      name: 'totalSales',
      content:"Total Sales",
      path: '/dashboard/totalsales',
      icon :"pi-dollar"
    },
    {
      name: 'totalOrder',
      content:"Total Orders",
      path: '/dashboard/total-order',
      icon: "pi-shopping-cart"
    },
    {
      name: 'cardStatic',
      path: '/dashboard/card-static',
      content:"Card Statistics Payment",
      icon: "pi-credit-card"
    },
    {
      name: 'saleByLocation',
      path: '/dashboard/sale-by-location',
      content:"Sales by Location",
      icon: "pi-globe"
    },
    {
      name: 'saleByPromotion',
      path: '/dashboard/sale-by-promotion',
      content:"Sale by Promotions",
      icon:"pi-tag"
    },
    {
      name: 'saleByChannel',
      path: '/dashboard/total-sale-by-channel',
      content:"Total sales by Channel",
      icon:"pi-home"
    },
  ]
  }
  isSubmenuOn: boolean | undefined;

  constructor(public layoutService: LayoutService) {
    
  }
  ngOnInit(){
    this.layoutService.currentSubMenuState.subscribe(state => this.isSubmenuOn = state);
  }
}