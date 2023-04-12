export interface BaseChart{
    id:number,
    text: string,
    value: number,
    date: string | number | Date
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
current: number,
id: number,
previous: number,
value: number,
text: string
}