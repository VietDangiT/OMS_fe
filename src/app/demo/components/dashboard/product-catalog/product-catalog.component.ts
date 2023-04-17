import { Component, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';
import { BaseChart, BaseInterface } from '../interfaces/interfaces';

@Component({
  selector: 'dashboard-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCatalogComponent {
  @Input() basicOptions!: ChartOptions;
  @Input() filterArr: string[];
  //Product Variant list
  productVariantList : BaseInterface[];
  product: BaseInterface;
  dataChart: ChartData;
  totalValue: string;

  selectedProduct: BaseInterface = {
    name:"All products",
    id: 0,
    description: "",
    number: 0
  };

  private productId = new BehaviorSubject<number>(0);
  productId$ = this.productId.asObservable();

  private change$ = new Subject();

  constructor(private dashboardService: DashboardService) {  
  }

  ngOnInit(){
    this.dashboardService.getProductVariant().pipe(
      tap((productList: BaseInterface[])=>{
        productList.unshift(this.selectedProduct);
        this.productVariantList = productList;  
      })).subscribe()
  }

  ngOnChanges(changes: SimpleChanges){
    this.filterArr = changes['filterArr'].currentValue;
    this.change$.next('');
    this.productId$.pipe(
      switchMap((id: number) => {
        return this.dashboardService.getProductCatalogs(id, this.filterArr).pipe(
          tap((result: BaseChart[]) =>{
            this.setupChartData(result);
          }))
       }
    ),
    takeUntil(this.change$)
    ).subscribe();
  }

  handleProductVariant(id: number){
    
    var index = this.productVariantList.findIndex(item => { return item.id == id });
    this.product = this.productVariantList[index];
    this.productId.next(this.product.id);
    this.selectedProduct = {...this.product}
  }



  setupChartData(result: BaseChart[]){
    var totalArr: number[] = [];
    var labelArr: string[] = [];
    var order: number = 0;
    result.map((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.date).toLocaleDateString());
    });

    this.totalValue = order.toLocaleString('en-US');

    this.dataChart = {
      labels: labelArr,
      datasets: [
        {
          label: 'Product Catalogs',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
        },
      ],
    };
  
  }

}
