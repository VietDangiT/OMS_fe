export const defaultSubMenu = [
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
  {
    name: 'inventory',
    path: '/inventory',
    icon: 'pi pi-box',
    submenu: {
      title: 'Inventory',
      items: [],
    },
  },
  {
    name: 'customer',
    path: '/customer',
    icon: 'pi pi-user-plus',

    submenu: {
      title: 'Customer',
      items: [],
    },
  },
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
    name: 'users',
    path: '/user/list',
    icon: 'pi pi-users',
    submenu: {
      title: 'Users',
      items: [],
    },
  },
  {
    name: 'channel',
    path: '/channels',
    icon: 'pi pi-phone',
    submenu: {
      title: 'Channels',
      items: [],
    },
  },
];
