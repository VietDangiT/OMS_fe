import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { InputFieldComponent } from '../share/input-field/input-field.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserDetailComponent,
    UserEditComponent,
    UserChangePasswordComponent,
    UserFormComponent,
    UserComponent,
  ],
  imports: [
    InputFieldComponent,
    CommonModule,
    UserRoutingModule,
    AppTopBarModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
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
