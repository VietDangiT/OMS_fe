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

  logoSrc = 'https://bbv.ch/wp-content/uploads/2021/08/bbv-Logo.png';

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
            channelArr.push(
              new MenuElementItem(
                c.countryName,
                c.countryName,
                `/channels`,
                'pi-home',
                { countryId: c.id }
              )
            );

            customerArr.push(
              new MenuElementItem(
                c.countryName,
                c.countryName,
                `/customer`,
                'pi-user-plus',
                { countryId: c.id }
              )
            );
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
            orderArr.push(
              new MenuElementItem(
                m.marketPlaceName,
                m.marketPlaceName,
                `/orders`,
                'pi-home',
                { marketplaceId: m.id }
              )
            );

            catalogueArr.push(
              new MenuElementItem(
                m.marketPlaceName,
                m.marketPlaceName,
                `/catalogues`,
                'pi-home',
                { marketplaceId: m.id }
              )
            );

            inventoryArr.push(
              new MenuElementItem(
                m.marketPlaceName,
                m.marketPlaceName,
                `/inventory`,
                'pi-home',
                { marketplaceId: m.id }
              )
            );
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

          this.menuElements[orderIndex].submenu.items = orderArr;

          this.menuElements[catalogueIndex].submenu.items = catalogueArr;

          this.menuElements[inventoryIndex].submenu.items = inventoryArr;
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
            userArr.push(
              new MenuElementItem(
                m.displayText,
                m.displayText,
                `/user/list`,
                'pi-user',
                { role: m.displayText },
                m.value
              )
            );
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
