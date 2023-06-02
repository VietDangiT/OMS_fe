import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  forkJoin,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  Marketplace,
  MarketplaceApiResponse,
} from '../../marketplace/models/marketplace.models';
import { MarketplaceService } from '../../marketplace/services/marketplace.service';
import {
  Statistic,
  StatisticOrderStatusApiResponse,
  StatisticProductChannelByStatusApiResponse,
  StatisticProductMarketplaceStockApiResponse,
} from '../interfaces/interfaces';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatisticComponent {
  @Input() filterArr: string[];

  marketplaceList: Marketplace[];

  marketplace: Marketplace;

  selectedMarketplace: Marketplace = {
    marketPlaceName: 'All marketplaces',
    id: 0,
  };

  orderStatistic: Statistic[];

  productStatistic: Statistic[];

  stockStatistic: Statistic[];

  private marketplaceId = new BehaviorSubject<number>(0);

  private marketplaceId$ = this.marketplaceId.asObservable();

  private changes$ = new Subject();

  constructor(
    private dashboardService: DashboardService,
    private marketplaceService: MarketplaceService
  ) {}

  ngOnInit(): void {
    this.marketplaceService
      .getMarketPlaces()
      .pipe(
        tap((res: MarketplaceApiResponse) => {
          const { marketPlaces: data } = res;

          this.marketplaceList = [this.selectedMarketplace, ...data];
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    const filter = changes['filterArr'].currentValue;

    this.changes$.next('');

    this.marketplaceId$
      .pipe(
        switchMap((id: number) => {
          const order$ = this.dashboardService.getOrderStatus(id, filter).pipe(
            tap((result: StatisticOrderStatusApiResponse) => {
              const { statisticOrders: data } = result;

              this.orderStatistic = data;
            })
          );

          const product$ = this.dashboardService
            .getProductChannelByStatus(id)
            .pipe(
              tap((result: StatisticProductChannelByStatusApiResponse) => {
                const { productChannelByStatus: data } = result;

                this.productStatistic = data;
              })
            );

          const stock$ = this.dashboardService
            .getProductMarketplaceStock(id)
            .pipe(
              tap((result: StatisticProductMarketplaceStockApiResponse) => {
                const { productChannelStock: data } = result;

                this.stockStatistic = data;
              })
            );

          return forkJoin([order$, product$, stock$]);
        }),
        takeUntil(this.changes$)
      )
      .subscribe();
  }

  handleSelectMarketplace(id: number) {
    var index = this.marketplaceList.findIndex(marketplace => {
      return marketplace.id === id;
    });
    this.marketplace = this.marketplaceList[index];
    this.marketplaceId.next(this.marketplace.id);
    this.selectedMarketplace = { ...this.marketplace };
  }
}
