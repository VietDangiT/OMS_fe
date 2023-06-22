import { Component, HostBinding, Input, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Catalogue } from '../../models/catalogue.models';

@Component({
  selector: 'oms-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.scss'],
})
export class CatalogueItemComponent {
  @HostBinding('class') hostClass = 'oms-catalogue-item';

  @Input() catalogue: Catalogue;

  helperService = inject(HelperService);

  ngOnInit(): void {
    this.catalogue = {
      ...this.catalogue,
      productVariantImage: this.helperService.refactorImg(
        this.catalogue.productVariantImage
      ),
      channelImage: this.helperService.refactorImg(
        this.helperService.arrayBufferToBase64(this.catalogue.channelImage)
      ),
    };
  }

  handleAction(): void {
    console.log('action');
  }

  handleEdit(): void {
    console.log('edit');
  }
}
