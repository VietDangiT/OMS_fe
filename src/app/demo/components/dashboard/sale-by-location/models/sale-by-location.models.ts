import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../interfaces/dashboard.models';

export interface SaleByLocation extends Partial<BaseChart> {
  extraValue: number;
}

export interface SaleLeadsApiResponse {
  saleLeads: BaseChart[];
}

export interface SaleAnalyticApiResponse {
  saleAnalytic: BaseChart[];
}

export interface SaleByCountryApiResponse {
  saleByCountry: BaseChart[];
}

export interface CountryPercentage {
  name: string;
  percentage: number;
}

export interface SaleByLocationParams extends Partial<PagingParams> {
  countryName: string;
}

export interface SaleByLocationTableApiResponse {
  orderSaleByCountry: {
    data: SaleByLocation[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}
