import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'detail',
        data: { breadcrumbs: ['User Profile'] },
        component: UserDetailComponent,
      },
      {
        path: 'edit',
        data: { breadcrumbs: ['User Profile'] },
        component: UserEditComponent,
      },
      {
        path: 'change-password',
        data: { breadcrumbs: ['Change Password'] },
        component: UserChangePasswordComponent,
      },
      {
        path: 'list',
        data: { breadcrumbs: ['User List'] },
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
