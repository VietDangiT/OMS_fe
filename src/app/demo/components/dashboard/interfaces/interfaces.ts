export interface BaseChart {
  id: number;
  text: string;
  value: number;
  date: string | number | Date;
  percentage: number;
  displayText: string;
}

export interface TotalSalesApiResponse {
  totalSale: BaseChart[];
}

export interface TotalReturn extends BaseChart {
  numberOfReturn: number;
}

export interface TotalSalesByLocationApiResponse {
  totalSaleByLocation: BaseChart[];
}

export interface TotalReturnByApiResponse {
  returnsBy: TotalReturn[];
}

export interface TotalOrderApiResponse {
  totalOrdersBy: BaseChart[];
}

export interface TotalSalesByProductApiResponse {
  totalSaleProductsBy: BaseChart[];
}

export interface TotalSalesByChannelApiResponse {
  totalSaleByChannel: BaseChart[];
}

export interface ProductVariantItemsSoldApiResponse {
  itemsSoldByProductVariant: BaseChart[];
}

export interface StatisticOrderStatusApiResponse {
  statisticOrders: Statistic[];
}

export interface StatisticProductMarketplaceStockApiResponse {
  productChannelStock: Statistic[];
}

export interface StatisticProductChannelByStatusApiResponse {
  productChannelByStatus: Statistic[];
}

export interface ProductVariantApiResponse {
  productVariants: BaseItem[];
}

export interface DashboardTable {
  headerData: string[];
  bodyData: any[];
}

export interface OrderOnChannelData {
  headerData: string[];
  bodyData: {
    channelImage: string;
    channelName: string;
    isActive: true;
    numberOrder: number;
    totalSale: number;
  }[];
}

export interface Statistic {
  current: number;
  id: number;
  previous: number;
  value: number;
  text: string;
}

export interface BaseItem {
  id: number;
  name: string;
  description: string;
  number: number;
}
