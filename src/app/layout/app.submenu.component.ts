import { Component} from '@angular/core';
import { LayoutService } from './service/app.layout.service';


@Component({
  selector: 'app-submenu',
  templateUrl: 'app.submenu.component.html',
})
export class SubmenuComponent {
  elements = [
    {
      name: 'totalSales',
      content:"Total Sales",
      path: '/dashboard/totalsales',
      icon :"pi pi-dollar"
    },
    {
      name: 'totalOrder',
      content:"Total Orders",
      path: '/dashboard/totalorder',
      icon: "pi pi-shopping-cart"
    },
    {
      name: 'cardStatic',
      path: '/dashboard/cardstatic',
      content:"Card Statistics Payment",
      icon: "pi pi-credit-card"
    },
    {
      name: 'saleByLocation',
      path: '/dashboard/salebylocation',
      content:"Sales by Location",
      icon: "pi pi-globe"
    },
    {
      name: 'saleByPromotion',
      path: '/dashboard/salebypromotion',
      content:"Sale by Promotions",
      icon:"pi pi-tag"
    },
    {
      name: 'saleByChannel',
      path: '/dashboard/salebychannel',
      content:"Total sales by Channel",
      icon:"pi pi-home"
    },
  ];
  isSubmenuOn: boolean | undefined;

  constructor(public layoutService: LayoutService) {
    
  }
  ngOnInit(){
    this.layoutService.currentSubMenuState.subscribe(state => this.isSubmenuOn = state );
  }
}