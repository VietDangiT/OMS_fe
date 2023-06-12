import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserDetailComponent,
    UserEditComponent,
    UserChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppTopBarModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    InputTextModule,
    RadioButtonModule,
  ],
})
export class UserModule {}
