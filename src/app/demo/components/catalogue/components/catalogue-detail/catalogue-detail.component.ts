import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { map } from 'rxjs';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Catalogue, CatalogueDetail } from '../../models/catalogue.models';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'oms-catalogue-detail',
  templateUrl: './catalogue-detail.component.html',
  styleUrls: ['./catalogue-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatalogueDetailComponent implements OnInit {
  @Input() catalogue: Catalogue;

  @Input() visible: boolean;

  @Output('onClose') onClose = new EventEmitter();

  catalogueService = inject(CatalogueService);

  helperService = inject(HelperService);

  mainImg = '';

  catalogueDetail: CatalogueDetail = {
    date: new Date(),
    description: '',
    image: '',
    images: [],
    rating: 0,
    reviews: 0,
    sold: 0,
    value: 0,
    displayText: '',
    channelsStock: [
      {
        displayText: '',
        image: '',
        id: 0,
        value: 0,
      },
    ],
  };

  ngOnInit(): void {
    this.getCatalogueDetail();
  }

  getCatalogueDetail(): void {
    this.catalogueService
      .getCatalogueDetail(this.catalogue.id, this.catalogue.channelId)
      .pipe(
        map(res => {
          const { productInventoryDetail: data } = res;

          this.catalogueDetail = this.refactorProductDetail(data);
        })
      )
      .subscribe();
  }

  refactorProductDetail(data: CatalogueDetail): CatalogueDetail {
    data.images = this.refactorImages(data.images, data.image);

    data.channelsStock = data.channelsStock.map(c => {
      return { ...c, image: this.helperService.refactorImg(c.image!) };
    });

    this.mainImg = data.images[0];

    return data;
  }

  refactorImages(images: number[][] | string[], mainImg: string): string[] {
    const res: string[] = [];

    images.map(i => {
      res.push(this.helperService.refactorImg(i.toString()));
    });

    res.unshift(this.helperService.refactorImg(mainImg));

    return res;
  }

  closeModal(): void {
    this.onClose.emit();
  }
}
