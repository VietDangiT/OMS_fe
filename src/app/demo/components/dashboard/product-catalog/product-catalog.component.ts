import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { HelperService } from 'src/app/demo/service/helper.service';
import {
  BaseItem,
  ProductVariantApiResponse,
  ProductVariantItemsSoldApiResponse,
} from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCatalogComponent {
  @Input() basicOptions!: ChartOptions;

  @Input() filterArr: string[];

  helperService = inject(HelperService);

  productVariantList: BaseItem[];

  product: BaseItem;

  routerLink = '/catalogues';

  dataChart: ChartData;

  totalValue: string;

  selectedProduct: BaseItem = {
    name: 'All products',
    id: 0,
    description: '',
    number: 0,
  };

  private productId = new BehaviorSubject<number>(0);

  productId$ = this.productId.asObservable();

  private change$ = new Subject();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService
      .getProductVariants()
      .pipe(
        tap((result: ProductVariantApiResponse) => {
          const { productVariants: data } = result;

          this.productVariantList = [this.selectedProduct, ...data];
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterArr = changes['filterArr'].currentValue;

    this.change$.next('');

    this.productId$
      .pipe(
        switchMap((id: number) => {
          return this.dashboardService
            .getProductVariantItemsSold(id, this.filterArr)
            .pipe(
              tap((result: ProductVariantItemsSoldApiResponse) => {
                const { itemsSoldByProductVariant: data } = result;

                this.dataChart = this.helperService.setupBasicChartData(
                  data,
                  this.filterArr,
                  false,
                  $localize`Product Catalogs`
                );
              })
            );
        }),
        takeUntil(this.change$)
      )
      .subscribe();
  }

  handleProductVariant(id: number) {
    let index = this.productVariantList.findIndex(item => {
      return item.id == id;
    });
    this.product = this.productVariantList[index];
    this.productId.next(this.product.id);
    this.selectedProduct = { ...this.product };
  }
}
