import { Component, Input } from '@angular/core';
import { Catalogue } from '../../models/catalogue.models';

@Component({
  selector: 'oms-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.scss'],
})
export class CatalogueItemComponent {
  @Input() catalogue: Catalogue;

  handleAction(): void {
    console.log('action');
  }

  handleEdit(): void {
    console.log('edit');
  }
}
