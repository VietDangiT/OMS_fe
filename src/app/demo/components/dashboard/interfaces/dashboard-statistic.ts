export interface DashboardStatistic {
  orderData: {
    newOrders: number | string,
    issue: number | string
  },
  productInventoryData: {
    productOutOfStock: number | string,
    nearlyOutOfStock: number | string,
    notSellingProductInLastThreeMonth: number | string
  },
  productData: {
    Inactive: number | string
  },
  channelData: {
    activeChannel: number | string,
    inactiveChannel: number | string
  }
}
