import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueListComponent } from './components/catalogue-list/catalogue-list.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumbs: ['Catalogue'] },
    component: CatalogueListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {}
