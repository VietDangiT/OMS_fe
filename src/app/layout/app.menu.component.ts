import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

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
export class AppMenuComponent implements OnInit {
  menuElements = [
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
          },
          {
            name: 'totalOrder',
            content: 'Total Orders',
            path: 'dashboard/total-order',
            icon: 'pi-shopping-cart',
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
        // item: [
        //   {
        //     name: 'totalSales',
        //     content: 'Total Sales',
        //     path: 'order/totalsales',
        //     icon: 'pi-dollar',
        //   },
        //   {
        //     name: 'totalOrder',
        //     content: 'Total Orders',
        //     path: 'order/total-order',
        //     icon: 'pi-shopping-cart',
        //   },
        //   {
        //     name: 'cardStatic',
        //     path: 'order/card-static',
        //     content: 'Card Statistics Payment',
        //     icon: 'pi-credit-card',
        //   },
        //   {
        //     name: 'saleByLocation',
        //     path: 'order/sale-by-location',
        //     content: 'Sales by Location',
        //     icon: 'pi-globe',
        //   },
        //   {
        //     name: 'saleByPromotion',
        //     path: 'order/sale-by-promotion',
        //     content: 'Sale by Promotions',
        //     icon: 'pi-tag',
        //   },
        //   {
        //     name: 'saleByChannel',
        //     path: 'order/total-sale-by-channel',
        //     content: 'Total sales by Channel',
        //     icon: 'pi-home',
        //   },
        // ]
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
      name: 'contact',
      path: '/contact',
      icon: 'pi pi-phone',
      isDropDownMenu:true,
      submenu: {
        title: 'Contacts',
        item: [
        
        ],
      }
    },
  ];
  isNavbarOn: boolean | undefined;
  model: any[] = [];

  constructor(public layoutService: LayoutService) {
   
    this.layoutService.currentNavbarState.subscribe(
      (state) => (this.isNavbarOn = state)
    );
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/uikit/floatlabel'],
          },
          {
            label: 'Invalid State',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/uikit/invalidstate'],
          },
          {
            label: 'Button',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/uikit/button'],
          },
          {
            label: 'Table',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/uikit/table'],
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/uikit/list'],
          },
          {
            label: 'Tree',
            icon: 'pi pi-fw pi-share-alt',
            routerLink: ['/uikit/tree'],
          },
          {
            label: 'Panel',
            icon: 'pi pi-fw pi-tablet',
            routerLink: ['/uikit/panel'],
          },
          {
            label: 'Overlay',
            icon: 'pi pi-fw pi-clone',
            routerLink: ['/uikit/overlay'],
          },
          {
            label: 'Media',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/uikit/media'],
          },
          {
            label: 'Menu',
            icon: 'pi pi-fw pi-bars',
            routerLink: ['/uikit/menu'],
            routerLinkActiveOptions: {
              paths: 'subset',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            },
          },
          {
            label: 'Message',
            icon: 'pi pi-fw pi-comment',
            routerLink: ['/uikit/message'],
          },
          {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/uikit/file'],
          },
          {
            label: 'Chart',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/uikit/charts'],
          },
          {
            label: 'Misc',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/uikit/misc'],
          },
        ],
      },
      {
        label: 'Prime Blocks',
        items: [
          {
            label: 'Free Blocks',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/blocks'],
            badge: 'NEW',
          },
          {
            label: 'All Blocks',
            icon: 'pi pi-fw pi-globe',
            url: ['https://www.primefaces.org/primeblocks-ng'],
            target: '_blank',
          },
        ],
      },
      {
        label: 'Utilities',
        items: [
          {
            label: 'PrimeIcons',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/utilities/icons'],
          },
          {
            label: 'PrimeFlex',
            icon: 'pi pi-fw pi-desktop',
            url: ['https://www.primefaces.org/primeflex/'],
            target: '_blank',
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/landing'],
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud'],
          },
          {
            label: 'Timeline',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/pages/timeline'],
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/notfound'],
          },
          {
            label: 'Empty',
            icon: 'pi pi-fw pi-circle-off',
            routerLink: ['/pages/empty'],
          },
        ],
      },
      {
        label: 'Hierarchy',
        items: [
          {
            label: 'Submenu 1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Get Started',
        items: [
          {
            label: 'Documentation',
            icon: 'pi pi-fw pi-question',
            routerLink: ['/documentation'],
          },
          {
            label: 'View Source',
            icon: 'pi pi-fw pi-search',
            url: ['https://github.com/primefaces/sakai-ng'],
            target: '_blank',
          },
        ],
      },
    ];
  }
}
