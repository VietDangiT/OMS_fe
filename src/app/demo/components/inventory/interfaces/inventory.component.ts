import { PagingParams } from 'src/app/demo/interface/global.model';

export interface Inventory {
  productVariantImage?: string;
  sku: number;
  productName: string;
  availableStock: number;
  basePrice: number;
  inProcess: number;
  sold: number;
  action: string;
  id: number;
}
export interface InventoryChannel {
  id: number;
  displayText: string;
  value: string;
}
export interface InventoryByChannelResponse {
  channelWithTotalProduct :InventoryChannel[] ;
}
export interface ListedStockOnChannel {
  image: string,
  info: string,
  displayText: string,
  value: number,
}

export interface CardInventoryApiResponse {
  productStatistic: CardInventory;
}

export interface CardInventory {
  live: number;
  outOfStock: number;
  lowOfStock: number;
  delistedAndSuspended: number;
  onDemand: number;
  __typename: any;
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

export interface ChannelByProductVariantApiResponse {
  channelByProductVariant: {
    displayText: string;
    id: number;
  }[];
}

export interface InventoryParams extends PagingParams {
  channelId: number | null;
  stockStatusFilter: String;
}

export interface ListedStockOnChannelApiResponse {
  listedProductOnChannelInfo: {
    image: string;
    info: string;
    displayText: string;
    value: number;
  }[];
}



export interface StockInfo {
  inProcess: number;
  sold: number;
  threshold: number;
  inStock: number;
  inhand: number;
  onhold: number;
  buffer: number;
  unusable: number;
}

export interface ChannelStockApiResponse {
  channelStockInfo: StockInfo;
}

export interface ProductInventoryInfoApiResponse {
  productInventoryInfo: number;
}
