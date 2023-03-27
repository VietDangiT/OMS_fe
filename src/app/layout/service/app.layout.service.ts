import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  private configUpdate = new Subject<AppConfig>();

  private overlayOpen = new Subject<any>();

  configUpdate$ = this.configUpdate.asObservable();

  overlayOpen$ = this.overlayOpen.asObservable();

  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }

  isOverlay() {
    return this.config.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onConfigUpdate() {
    this.configUpdate.next(this.config);
  }

  constructor() {}
  private isSubmenuOn = new BehaviorSubject<boolean>(false);
  currentSubMenuState = this.isSubmenuOn.asObservable();

  changeSubMenuState(state?: boolean) {
    if (state != null) {
      this.isSubmenuOn.next(state);
    } else {
      var result: boolean = false;
      this.isSubmenuOn.subscribe((state) => (result = state));
      this.isSubmenuOn.next(!result);
    }
  }

  getSubmenuList(type: string) {    
    var filter = type?.toLowerCase();
    switch (filter) {
      case 'dashboard':
        var result = {
          title: 'Dashboard',
          items: [
            {
              name: 'totalSales',
              content: 'Total Sales',
              path: '/dashboard/totalsales',
              icon: 'pi-dollar',
            },
            {
              name: 'totalOrder',
              content: 'Total Orders',
              path: '/dashboard/total-order',
              icon: 'pi-shopping-cart',
            },
            {
              name: 'cardStatic',
              path: '/dashboard/card-static',
              content: 'Card Statistics Payment',
              icon: 'pi-credit-card',
            },
            {
              name: 'saleByLocation',
              path: '/dashboard/sale-by-location',
              content: 'Sales by Location',
              icon: 'pi-globe',
            },
            {
              name: 'saleByPromotion',
              path: '/dashboard/sale-by-promotion',
              content: 'Sale by Promotions',
              icon: 'pi-tag',
            },
            {
              name: 'saleByChannel',
              path: '/dashboard/total-sale-by-channel',
              content: 'Total sales by Channel',
              icon: 'pi-home',
            },
          ],
        };
        return result;

      case 'user':
        var result = {
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
        };
        return result;
      default:
        return null;
    }
  }
}
