import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerLoyaltyComponent } from './customer-loyalty/customer-loyalty.component';
import { NgModule } from '@angular/core';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { CustomerBychannelComponent } from './customer-bychannel/customer-bychannel.component';
import { CustomerRatingComponent } from './customer-rating/customer-rating.component';
import { CustomerLocationComponent } from './customer-location/customer-location.component';
import { CustomerTopproductComponent } from './customer-topproduct/customer-topproduct.component';
import { CustomerAllcustomerComponent } from './customer-allcustomer/customer-allcustomer.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumbs: ['Customer'] },
    component: CustomerComponent,
  },
  {
    path: 'all-customer',
    data: { breadcrumbs: ['Customer', 'All Customer'] },
    component: CustomerAllcustomerComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
