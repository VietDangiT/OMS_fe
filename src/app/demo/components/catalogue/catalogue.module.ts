import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { AvatarComponent } from '../share/avatar/avatar.component';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueDetailComponent } from './components/catalogue-detail/catalogue-detail.component';
import { CatalogueItemComponent } from './components/catalogue-item/catalogue-item.component';
import { CatalogueListComponent } from './components/catalogue-list/catalogue-list.component';

@NgModule({
  declarations: [
    CatalogueComponent,
    CatalogueListComponent,
    CatalogueItemComponent,
    CatalogueDetailComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    RouterModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
    AvatarComponent,
    TabMenuComponent,
    DialogModule,
    FormsModule,
    RatingModule,
  ],
})
export class CatalogueModule {}
