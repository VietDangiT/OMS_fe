import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';

export interface Catalogue {
  id: number;
  productName: string;
  sku: string;
  productVariantImage: string;
  basePrice: number;
  createdAt: string;
  status?: ProductChannelStatus;
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

export interface CatalogueParams extends PagingParams {
  channelId: number | null;
  status: ProductChannelStatus;
}

export interface ProductStatusApiResponse {
  productStatus: BaseChart[];
}
