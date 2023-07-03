import { Component } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  Channel,
  Country,
} from '../demo/components/channel/interface/channel.model';
import { MarketplaceService } from '../demo/components/marketplace/services/marketplace.service';
import { defaultSubMenu } from '../demo/constants/sub-menu.constants';
import { ChannelService } from '../demo/service/channel.service';
import { UserService } from '../demo/service/user.service';
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
        @apply visible flex opacity-100 pointer-events-auto;
      }
      .active.submenu {
        @apply flex;
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

  menuElements: MenuElement[] = defaultSubMenu;

  isNavbarOn: boolean | undefined;

  private readonly destroy$ = new Subject();

  constructor(
    public layoutService: LayoutService,
    private channelService: ChannelService,
    private marketPlaceService: MarketplaceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getNavbarState();

    this.initCountries();

    this.initMarketplaces();

    this.initUserRole();
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

          const channelArr: MenuElementItem[] = [];

          const customerArr: MenuElementItem[] = [];

          countries.forEach((c: Country) => {
            channelArr.push({
              name: c.countryName,
              content: c.countryName,
              path: `/channels`,
              param: { countryId: c.id },
              icon: 'pi-home',
            });

            customerArr.push({
              name: c.countryName,
              content: c.countryName,
              path: `/customer`,
              param: { countryId: c.id },
              icon: 'pi-user-plus',
            });
          });

          const channelIndex = this.menuElements.findIndex(
            c => c.path === channelArr[0].path
          );

          this.menuElements[channelIndex].submenu.items = channelArr;

          const customerIndex = this.menuElements.findIndex(
            c => c.path === customerArr[0].path
          );

          this.menuElements[customerIndex].submenu.items = customerArr;
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
          const inventoryArr: MenuElementItem[] = [];

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

            inventoryArr.push({
              name: m.marketPlaceName,
              content: m.marketPlaceName,
              path: `/inventory`,
              param: { marketplaceId: m.id },
              icon: 'pi-box',
            });
          });

          const orderIndex = this.menuElements.findIndex(
            c => c.path === orderArr[0].path
          );
          const catalogueIndex = this.menuElements.findIndex(
            c => c.path === catalogueArr[0].path
          );

          const inventoryIndex = this.menuElements.findIndex(
            c => c.path === inventoryArr[0].path
          );

          this.menuElements[orderIndex].submenu!.items = orderArr;

          this.menuElements[catalogueIndex].submenu!.items = catalogueArr;

          this.menuElements[inventoryIndex].submenu!.items = inventoryArr;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  initUserRole(): void {
    this.userService
      .getUserRole()
      .pipe(
        tap(res => {
          const { userRole } = res;

          const userArr: MenuElementItem[] = [];

          userRole.forEach(m => {
            userArr.push({
              name: m.displayText,
              content: m.displayText,
              path: `/user/list`,
              param: { role: m.displayText },
              icon: 'pi-user',
              value: m.value,
            });
          });

          const userIndex = this.menuElements.findIndex(
            c => c.path === '/user/list'
          );

          this.menuElements[userIndex].submenu.items = userArr;
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
