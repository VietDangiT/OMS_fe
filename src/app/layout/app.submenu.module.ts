import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubmenuComponent } from './app.submenu.component';


@NgModule({
  declarations: [SubmenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [SubmenuComponent],
})
export class SubmenuModule {}
