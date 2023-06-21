import { PagingParams } from 'src/app/demo/interface/global.model';

export interface Inventory {
  productVariantImage? : string ;
  sku: number;
  productName : string;
  availableStock: number;
  basePrice: number;
  inProcess : number;
  sold : number;
  action: string;

}
export interface CardInventoryApiResponse {
  productStatistic : CardInventory[];
}
export interface CardInventory {
  live: string ;
  outOfStock : number;
  lowOfStock : number;
  delistedAndSuspended : number ;
  onDemand : number;
}



export interface InventoryTableApiResponse {
  products: {
    data: Inventory[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };


}

export interface InventoryParams extends PagingParams {
  channelId: number;
}



