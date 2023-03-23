export interface SaleOnChannel {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean,
    tension: number
  }[];
}
