export interface Channel {
  description: string;
  id: number;
  name: string;
  number: number;
  numberOrders?: number;
  value?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}

export interface Country extends Channel {}
