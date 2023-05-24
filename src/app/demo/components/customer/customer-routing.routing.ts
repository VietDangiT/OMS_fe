import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerLoyaltyComponent } from './customer-loyalty/customer-loyalty.component';
import { NgModule } from '@angular/core';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { CustomerBychannelComponent } from './customer-bychannel/customer-bychannel.component';
import { CustomerRatingComponent } from './customer-rating/customer-rating.component';
import { CustomerLocationComponent } from './customer-location/customer-location.component';
import { CustomerTopproductComponent } from './customer-topproduct/customer-topproduct.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumbs: ['Customer'] },
    component: CustomerComponent,
  },
  {
    path: 'customer-loyalty',
    data: { breadcrumbs: ['Loyalty'] },
    component: CustomerLoyaltyComponent,
  },
  {
    path: 'customer-feedback',
    data: { breadcrumbs: ['Feedback'] },
    component: CustomerFeedbackComponent,
  },
  {
    path: 'customer-channel',
    data: { breadcrumbs: ['By Channel'] },
    component: CustomerBychannelComponent,
  },
  {
    path: 'customer-rating',
    data: { breadcrumbs: ['Customer-Rating'] },
    component: CustomerRatingComponent,
  },
  {
    path: 'customer-location',
    data: { breadcrumbs: ['Location'] },
    component: CustomerLocationComponent,
  },
  {
    path: 'customer-topproduct',
    data: { breadcrumbs: ['Top-Product'] },
    component: CustomerTopproductComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
