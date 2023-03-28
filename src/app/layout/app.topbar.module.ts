import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AppTopBarComponent } from './app.topbar.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent, AppTopBarComponent],
  imports: [BreadcrumbModule, CommonModule],
  exports: [AppTopBarComponent],
})
export class AppTopBarModule {}
