import { Component, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dashboard-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCatalogComponent {
  @Input() basicOptions!: ChartOptions;
  @Input() filterArr: string[];
  
  //Product Variant list
  productVariantList : any[];
  product: any;
  dataChart: ChartData;

  selectedProduct: string ="All products";

  private productId = new BehaviorSubject<number>(0);
  productId$ = this.productId.asObservable();
  
  totalValue: string;

  private change$ = new Subject();

  constructor(private dashboardService: DashboardService) {  
  }

  ngOnInit(){
    this.dashboardService.getProductVariant().subscribe((productList: any)=>{
      this.productVariantList = productList;  
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.filterArr = changes['filterArr'].currentValue;
    this.change$.next('');
    this.productId$.pipe(
      switchMap((id: number) => {
        return this.dashboardService.getProductCatalogs(id, this.filterArr).pipe(
          tap((result: any) =>{
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
    this.selectedProduct = `${this.product.name} ${this.product.description}`
  }

  getAllProducts(){
    this.productId.next(0);
    this.selectedProduct = "All products";
  }

  setupChartData(result:any){
    var totalArr: number[] = [];
    var labelArr: string[] = [];
    var order: number = 0;
    result.map((item: any) => {
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
