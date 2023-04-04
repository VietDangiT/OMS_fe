import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class LoginModule { }
