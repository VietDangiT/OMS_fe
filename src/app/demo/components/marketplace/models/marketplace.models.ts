export interface MarketplaceApiResponse {
  marketPlaces: Marketplace[];
}

export interface Marketplace {
  marketPlaceName: string;
  id: number;
  marketPlaceImage?: string;
}
