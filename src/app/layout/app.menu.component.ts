import { Component } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  Channel,
  Country,
} from '../demo/components/channel/interface/channel.component';
import { ChannelService } from '../demo/service/channel.service';
import { LayoutService } from './service/app.layout.service';
import { MenuElement, MenuElementItem } from './service/models/menu.models';

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
      .active.submenu {
        @apply block;
      }
      /* For Webkit-based browsers (Chrome, Safari and Opera) */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      /* For IE, Edge and Firefox */
      .scrollbar-hide {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    `,
  ],
})
export class AppMenuComponent {
  channels: Channel[];

  menuElements: MenuElement[] = [
    {
      name: 'dashboard',
      path: '/dashboard',
      icon: 'pi pi-th-large',
      submenu: {
        title: 'Dashboard',
        items: [
          {
            name: 'totalSales',
            content: 'Total Sales',
            path: 'dashboard/total-sales',
            icon: 'pi-dollar',
            param: {},
          },
          {
            name: 'totalOrder',
            content: 'Total Orders',
            path: 'dashboard/total-orders',
            icon: 'pi-shopping-cart',
            param: {},
          },

          {
            name: 'saleByLocation',
            path: 'dashboard/sale-by-location',
            content: 'Sales by Location',
            icon: 'pi-globe',
          },
          {
            name: 'saleByChannel',
            path: 'dashboard/total-sale-by-channel',
            content: 'Total sales by Channel',
            icon: 'pi-home',
          },
        ],
      },
    },
    {
      name: 'orders',
      path: '/orders',
      icon: 'pi pi-box',
      submenu: {
        title: 'Orders',
      },
    },
    {
      name: 'catalogue',
      path: '/catalogue',
      icon: 'pi pi-book',
      submenu: {
        title: 'Catalogue',
        items: [],
      },
    },
    {
      name: 'inventory',
      path: '/inventory',
      icon: 'pi pi-inbox',
      submenu: {
        title: 'Inventory',
        items: [],
      },
    },
    {
      name: 'user',
      path: '/user',
      icon: 'pi pi-user',
      submenu: {
        title: 'Profile',
        items: [
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
      },
    },
    {
      name: 'customer',
      path: '/customer',
      icon: 'pi pi-users',
      submenu: {
        title: 'Customer',
        items: [],
      },
    },
    {
      name: 'channel',
      path: '/channels',
      icon: 'pi pi-phone',
      submenu: {
        title: 'Channels',
      },
    },
  ];

  isNavbarOn: boolean | undefined;

  private readonly destroy$ = new Subject();

  constructor(
    public layoutService: LayoutService,
    private channelService: ChannelService
  ) {
    this.layoutService.currentNavbarState
      .pipe(tap(state => (this.isNavbarOn = state)))
      .subscribe();
  }

  ngOnInit(): void {
    this.initCountries();
  }

  initCountries(): void {
    this.channelService
      .getCountries()
      .pipe(
        tap((result: Country[]) => {
          const resultArr: MenuElementItem[] = [];

          result.forEach((c: Country) => {
            resultArr.push({
              name: c.name,
              content: c.name,
              path: `/channels`,
              param: { countryId: c.id },
              icon: 'pi-home',
            });
          });

          const index = this.menuElements.findIndex(
            c => c.path === '/channels'
          );

          this.menuElements[index].submenu.items = resultArr;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
