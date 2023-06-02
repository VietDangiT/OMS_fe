import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './demo/components/guard/auth.guard';
import { RoleGuard } from './demo/components/guard/role.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          canActivate: [AuthGuard],
          children: [
            {
              path: 'dashboard',
              loadChildren: () =>
                import('./demo/components/dashboard/dashboard.module').then(
                  m => m.DashboardModule
                ),
            },
            {
              path: 'uikit',
              loadChildren: () =>
                import('./demo/components/uikit/uikit.module').then(
                  m => m.UIkitModule
                ),
            },
            {
              path: 'utilities',
              loadChildren: () =>
                import('./demo/components/utilities/utilities.module').then(
                  m => m.UtilitiesModule
                ),
            },
            {
              path: 'documentation',
              loadChildren: () =>
                import(
                  './demo/components/documentation/documentation.module'
                ).then(m => m.DocumentationModule),
            },
            {
              path: 'blocks',
              loadChildren: () =>
                import('./demo/components/primeblocks/primeblocks.module').then(
                  m => m.PrimeBlocksModule
                ),
            },
            {
              path: 'pages',
              loadChildren: () =>
                import('./demo/components/pages/pages.module').then(
                  m => m.PagesModule
                ),
            },
            {
              path: 'channels',
              loadChildren: () =>
                import('./demo/components/channel/channel.module').then(
                  m => m.ChannelModule
                ),
            },
            {
              path: 'catalogues',
              loadChildren: () =>
                import('./demo/components/catalogue/catalogue.module').then(
                  m => m.CatalogueModule
                ),
            },
            {
              path: 'customer',
              loadChildren: () =>
                import('./demo/components/customer/customer.module').then(
                  m => m.CustomerModule
                ),
            },
            {
              path: 'orders',
              loadChildren: () =>
                import('./demo/components/orders/orders.module').then(
                  m => m.OrdersModule
                ),
            },
          ],
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('./demo/components/auth/auth.module').then(
              m => m.AuthModule
            ),
        },
        {
          path: 'landing',
          loadChildren: () =>
            import('./demo/components/landing/landing.module').then(
              m => m.LandingModule
            ),
        },
        {
          path: 'login',
          loadChildren: () =>
            import('./demo/components/login/login.module').then(
              m => m.LoginModule
            ),
        },
        {
          path: 'admin',
          canActivate: [RoleGuard],
          data: { expectedRole: 'admin' },
          loadChildren: () =>
            import('./demo/components/admin/admin.module').then(
              m => m.AdminModule
            ),
        },
        { path: 'notfound', component: NotfoundComponent },
        // { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
