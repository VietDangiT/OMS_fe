import { ChannelStatus } from '../../../channel/interface/channel.model';
import { BaseChart } from '../../interfaces/dashboard.models';

export interface TotalSaleByChannel {
  channelImage: string;
  channelName: string;
  status: ChannelStatus;
  numberOfOrder: number;
  totalSales: number;
}

export interface ChannelOrderTableApiResponse {
  channelOrderTableData: {
    page: number;
    first: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
    data: TotalSaleByChannel[];
  };
}

export interface ChannelSaleApiResponse {
  channelSaleByConditionDate: BaseChart[];
}
