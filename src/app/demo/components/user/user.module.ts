import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { ShareModule } from '../share/share.module';
import { DialogModule } from 'primeng/dialog';
import { UserItemComponent } from './user-item/user-item.component';
import { UserRoutingModule } from './user-routing.module';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    AppTopBarModule,
    CommonModule,
    UserRoutingModule,
    TabMenuModule,
    ShareModule,
    DialogModule,
    AvatarModule 
  ]
})
export class UserModule { }
