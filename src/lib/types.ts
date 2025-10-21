export interface QRSettings {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  logo?: string;
}

export interface QRHistoryItem {
  id: string;
  text: string;
  date: string;
  logo?: string;
}
