import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ChannelService } from '../demo/service/channel.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Channel, Country } from '../demo/components/channel/interface/channel.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styles: [
    `
      .active {
        @apply font-semibold opacity-100  border-secondary md:border-b-0 text-primary;
      }
      .active div {
        @apply visible block opacity-100 pointer-events-auto;
      }
      .active.submenu{
        @apply block;
      }
      /* For Webkit-based browsers (Chrome, Safari and Opera) */
      .scrollbar-hide::-webkit-scrollbar {
      display: none;
      }

      /* For IE, Edge and Firefox */
      .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
      }
    `,
  ],
})
export class AppMenuComponent {
  channels: Channel[] ;

  menuElements: any[] = [
    {
      name: 'dashboard',
      path: '/dashboard',
      icon: 'pi pi-th-large',
      isDropDownMenu:true,
      submenu: {
        title:"Dashboard",
        item: [
          {
            name: 'totalSales',
            content: 'Total Sales',
            path: 'dashboard/totalsales',
            icon: 'pi-dollar',
            param:{}
          },
          {
            name: 'totalOrder',
            content: 'Total Orders',
            path: 'dashboard/total-order',
            icon: 'pi-shopping-cart',
            param:{}

          },
          {
            name: 'cardStatic',
            path: 'dashboard/card-static',
            content: 'Card Statistics Payment',
            icon: 'pi-credit-card',
          },
          {
            name: 'saleByLocation',
            path: 'dashboard/sale-by-location',
            content: 'Sales by Location',
            icon: 'pi-globe',
          },
          {
            name: 'saleByPromotion',
            path: 'dashboard/sale-by-promotion',
            content: 'Sale by Promotions',
            icon: 'pi-tag',
          },
          {
            name: 'saleByChannel',
            path: 'dashboard/total-sale-by-channel',
            content: 'Total sales by Channel',
            icon: 'pi-home',
          },
        ]
      }
    },
    {
      name: 'order',
      path: '/order',
      icon: 'pi pi-box',
      isDropDownMenu:true,
      submenu: {
        title:"Orders",
      }
    },
    {
      name: 'catalogue',
      path: '/catalogue',
      icon: 'pi pi-book',
      isDropDownMenu:true,
      submenu: {
        title: 'Catalogue',
        item: [
        
        ],
      }
    },
    {
      name: 'inventory',
      path: '/inventory',
      icon: 'pi pi-inbox',
      isDropDownMenu:true,
      submenu: {
        title: 'Inventory',
        item: [
        
        ],
      }
    },
    {
      name: 'user',
      path: '/user',
      icon: 'pi pi-user',
      isDropDownMenu:true,
      submenu: {
        title: 'Profile',
        item: [
        {
          name: 'personalinfo',
          content: 'Personal Info',
          path: '/users/personal-info',
          icon: 'pi-user',
        },
        {
          name: 'changepassword',
          content: 'Change Password',
          path: '/users/change-password',
          icon: 'pi-lock',
        },
        ],
      }
    },
    {
      name: 'customer',
      path: '/customer',
      icon: 'pi pi-users',
      isDropDownMenu:true,
      submenu: {
        title: 'Customer',
        item: [
        
        ],
      }
    },
    {
      name: 'channel',
      path: '/channels',
      icon: 'pi pi-phone',
      isDropDownMenu:true,
      submenu: {
        title: 'Channels',     
      }
    },
  ];
  isNavbarOn: boolean | undefined;

  constructor(public layoutService: LayoutService, private channelService: ChannelService, private router:Router) {
    this.channelService.getCountries().pipe(
     tap((result: Country[])=>{
       const resultArr: any[] = [];
       result.forEach((c: Country)=> {
         resultArr.push({
           name: c.name,
           content: c.name,
           path: `/channels`,
           param: {countryId: c.id},  
           icon: 'pi-home'
         })
       });       
      const index = this.menuElements.findIndex(c => c.path === '/channels');
      this.menuElements[index].submenu.item = resultArr;       
      })
      ).subscribe();

   this.layoutService.currentNavbarState.pipe(
    tap((state) => (this.isNavbarOn = state))
   ).subscribe();
    }

}
