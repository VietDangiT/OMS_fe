interface InventoryStatus {
  label: string;
  value: string;
}

export interface Product {
  id?: string;
  barcode?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  category?: string;
  image?: string;
  rating?: number;
}

export interface ProductCatalog {
  OrderedAt: any;
  TotalSales: any;
}
