import { MenuItem } from "primeng/api";
import { TableHeader } from "src/app/demo/interface/global.model";

export const userHeaderTable: TableHeader[] = [
  { field: 'order', col: 'Order' },
  { field: 'date', col: 'Date' },
  { field: 'channelName', col: 'Channel name' },
  { field: 'productUnits', col: 'Product Units' },
  { field: 'price', col: 'Price' },
  { field: 'shippingCarrier', col: 'Shipping carrier' },
  { field: 'status', col: 'Status' },
  { field: 'actions', col: 'Actions' },
];

export const userLabelItems: MenuItem[] = [
  { label: 'All', id: '0', badge: '0' },
  { label: 'Active', id: '1', badge: '0' },
  { label: 'Inactive', id: '2', badge: '0' },
];