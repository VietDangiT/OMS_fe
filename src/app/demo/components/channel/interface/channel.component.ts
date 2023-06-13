import { PagingParams } from 'src/app/demo/interface/global.model';

export interface Channel {
  description: string;
  id: number;
  name: string;
  number: number;
  numberOrders?: number;
  value?: number;
  status?: ChannelStatus;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}

export interface Country {
  id: number;
  countryName: string;
  shortCode: string;
  displayName?: string;
}

export interface CountryApiResponse {
  countries: Country[];
}

export interface ChannelTableApiResponse {
  channelsTableData: {
    data: Channel[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}

export interface ChannelParams extends PagingParams {
  countryId: number;
}

export type ChannelStatus = 'Active' | 'Inactive';
