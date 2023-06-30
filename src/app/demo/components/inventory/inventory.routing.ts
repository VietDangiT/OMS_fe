import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumbs: ['Inventory'] },
    component: InventoryComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutes {}
