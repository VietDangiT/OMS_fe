import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'oms-tab-menu',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent {
  @Input() labelItems: MenuItem[];

  @Input() activeItem: MenuItem;

  @Output() onActiveItemChange = new EventEmitter();

  itemChanges(item: MenuItem): void {
    this.onActiveItemChange.emit(item);
  }
}
