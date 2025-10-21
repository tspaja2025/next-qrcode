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

export interface QRPreviewProps {
  text: string;
  fgColor: string;
  bgColor: string;
  logo?: string;
  size: number;
  handleDownload: () => void;
  handleDownloadSVG: () => void;
}

export interface QRHistoryProps {
  history: { id: string; text: string; logo?: string }[];
  setText: (v: string) => void;
  clearHistory: () => void;
}

export interface QRConfigProps {
  text: string;
  setText: (v: string) => void;
  size: number;
  setSize: (v: number) => void;
  fgColor: string;
  setFgColor: (v: string) => void;
  bgColor: string;
  setBgColor: (v: string) => void;
  logo?: string;
  setLogo: (v?: string) => void;
}

export interface ColorFieldProps {
  id: string;
  label: string;
  color: string;
  setColor: (v: string) => void;
}
