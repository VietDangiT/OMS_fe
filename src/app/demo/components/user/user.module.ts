import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { AvatarComponent } from '../share/avatar/avatar.component';
import { InputFieldComponent } from '../share/input-field/input-field.component';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserInfoFieldComponent } from './components/user-info-field/user-info-field.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserSocialComponent } from './components/user-social/user-social.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
    UserDetailComponent,
    UserChangePasswordComponent,
    UserFormComponent,
    UserComponent,
    UserSocialComponent,
    UserEditComponent,
    UserInfoFieldComponent,
  ],
  imports: [
    CommonModule,
    AppTopBarModule,
    CommonModule,
    UserRoutingModule,
    ShareModule,
    DialogModule,
    AvatarModule,
    InputFieldComponent,
    CommonModule,
    UserRoutingModule,
    AppTopBarModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarComponent,
    TabMenuComponent,
    InputTextModule,
    RadioButtonModule,
    CalendarModule,
    ButtonModule,
    FileUploadModule,
    RouterModule,
    PasswordModule,
  ],
})
export class UserModule {}
