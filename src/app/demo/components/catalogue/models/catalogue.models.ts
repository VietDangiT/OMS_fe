import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';

export interface Catalogue {
  id: number;
  productName: string;
  sku: string;
  productVariantImage: string;
  channelImage: any;
  channelName: string;
  basePrice: number;
  createdAt: string;
  status?: ProductChannelStatus;
  channelId: number;
  availableStock: number;
}

export type ProductChannelStatus = 'Active' | 'Inactive';

export interface CatalogueTableApiResponse {
  products: {
    data: Catalogue[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}

export interface CatalogueDetailApiResponse {
  productInventoryDetail: CatalogueDetail;
}

export interface CatalogueDetail {
  image: string;
  displayText: string;
  value: number;
  date: string | Date;
  description: string;
  images: any;
  rating: number;
  reviews: number;
  sold: number;
  channelsStock: Partial<BaseChart>[];
}

export interface CatalogueParams extends PagingParams {
  channelId: number | null;
  status: ProductChannelStatus;
}

export interface ProductStatusApiResponse {
  productStatus: BaseChart[];
}
