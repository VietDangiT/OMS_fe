import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: ':id',
    data: { breadcrumbs: ['User Profile'] },
    component: UserDetailComponent,
  },
  {
    path: ':id/edit',
    data: { breadcrumbs: ['User Profile'] },
    component: UserEditComponent,
  },
  {
    path: ':id/change-password',
    data: { breadcrumbs: ['Change Password'] },
    component: UserChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
