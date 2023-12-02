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

  modalVisible = false;

  ngOnInit(): void {
 
    this.catalogue = {
      ...this.catalogue,
      productVariantImage: this.helperService.prefixImgSrc(
        this.catalogue.productVariantImage
      ),
      channelImage: this.helperService.prefixImgSrc(
        this.catalogue.channelImage
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
