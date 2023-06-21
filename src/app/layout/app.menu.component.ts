import { Component } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  Channel,
  Country,
} from '../demo/components/channel/interface/channel.component';
import { MarketplaceService } from '../demo/components/marketplace/services/marketplace.service';
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
            content: 'Sales Analytics',
            path: 'dashboard/total-sales',
            icon: 'pi-dollar',
            param: {},
          },
          {
            name: 'totalOrder',
            content: 'Orders Analytics',
            path: 'dashboard/total-orders',
            icon: 'pi-shopping-cart',
            param: {},
          },

          {
            name: 'saleByLocation',
            path: 'dashboard/sale-by-location',
            content: 'Sales by Location Analytics',
            icon: 'pi-globe',
          },
          {
            name: 'saleByChannel',
            path: 'dashboard/total-sale-by-channel',
            content: 'Sales by Channel Analytics',
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
        items: [],
      },
    },
    {
      name: 'catalogue',
      path: '/catalogues',
      icon: 'pi pi-inbox',
      submenu: {
        title: 'Catalogue',
        items: [],
      },
    },
    // {
    //   name: 'payment',
    //   path: '/payment',
    //   icon: 'pi pi-credit-card',
    //   submenu: {
    //     title: 'Payment',
    //     items: [],
    //   },
    // },
    // {
    //   name: 'inventory',
    //   path: '/inventory',
    //   icon: 'pi pi-inbox',
    //   submenu: {
    //     title: 'Inventory',
    //     items: [],
    //   },
    // },
    {
      name: 'user',
      path: '/user/detail',
      icon: 'pi pi-user',
      submenu: {
        title: 'Profile',
        items: [
          {
            name: 'personalinfo',
            content: 'Personal Info',
            path: `user/detail`,
            icon: 'pi-user',
          },
          {
            name: 'editprofile',
            content: 'Edit Profile',
            path: `user/edit`,
            icon: 'pi-pencil',
          },
          {
            name: 'changepassword',
            content: 'Change Password',
            path: `user/change-password`,
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
    private channelService: ChannelService,
    private marketPlaceService: MarketplaceService
  ) {}

  ngOnInit(): void {
    this.getNavbarState();

    this.initCountries();

    this.initMarketplaces();
  }

  getNavbarState(): void {
    this.layoutService.currentNavbarState
      .pipe(
        tap(state => (this.isNavbarOn = state)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  initCountries(): void {
    this.channelService
      .getCountries()
      .pipe(
        tap(res => {
          const { countries } = res;

          const resultArr: MenuElementItem[] = [];

          countries.forEach((c: Country) => {
            resultArr.push({
              name: c.countryName,
              content: c.countryName,
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

  initMarketplaces(): void {
    this.marketPlaceService
      .getMarketPlaces()
      .pipe(
        tap(res => {
          const { marketPlaces } = res;

          const orderArr: MenuElementItem[] = [];
          const catalogueArr: MenuElementItem[] = [];

          marketPlaces.forEach(m => {
            orderArr.push({
              name: m.marketPlaceName,
              content: m.marketPlaceName,
              path: `/orders`,
              param: { marketplaceId: m.id },
              icon: 'pi-home',
            });

            catalogueArr.push({
              name: m.marketPlaceName,
              content: m.marketPlaceName,
              path: `/catalogues`,
              param: { marketplaceId: m.id },
              icon: 'pi-home',
            });
          });

          const orderIndex = this.menuElements.findIndex(
            c => c.path === '/orders'
          );
          const catalogueIndex = this.menuElements.findIndex(
            c => c.path === '/catalogues'
          );

          this.menuElements[orderIndex].submenu.items = orderArr;
          this.menuElements[catalogueIndex].submenu.items = catalogueArr;
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
