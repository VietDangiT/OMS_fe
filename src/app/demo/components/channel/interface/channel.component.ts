import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';

export interface Channel {
  description: string;
  id: number;
  channelName: string;
  number: number;
  numberOfOrder?: number;
  shortCode?: string;
  totalSale?: number;
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
  countryId: number | null;

}

export type ChannelStatus = 'Active' | 'Inactive';

export interface ChannelStatusApiResponse {
  channelStatus: BaseChart[];
}
