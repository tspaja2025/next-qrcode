"use client";

import { useCallback } from "react";
import { Header } from "@/components/qr/Header";
import { QRConfigPanel } from "@/components/qr/QRConfigPanel";
import { QRHistoryPanel } from "@/components/qr/QRHistoryPanel";
import { QRPreviewPanel } from "@/components/qr/QRPreviewPanel";
import { useQRCode } from "@/hooks/use-qr-code";
import { downloadQRAsPNG, downloadQRAsSVG } from "@/lib/downloadQR";

export default function Home() {
  const {
    text,
    setText,
    size,
    setSize,
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    logo,
    setLogo,
    history,
    addToHistory,
    clearHistory,
  } = useQRCode();

  const handleDownload = useCallback(() => {
    if (text) addToHistory(text, logo);
    downloadQRAsPNG("qr-code");
  }, [text, logo, addToHistory]);

  const handleDownloadSVG = () => downloadQRAsSVG(text, fgColor, bgColor, size);

  return (
    <div className="font-sans min-h-screen">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 max-w-6xl mx-auto">
        <QRConfigPanel
          text={text}
          setText={setText}
          size={size}
          setSize={setSize}
          fgColor={fgColor}
          setFgColor={setFgColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          logo={logo}
          setLogo={setLogo}
        />

        <QRPreviewPanel
          text={text}
          fgColor={fgColor}
          bgColor={bgColor}
          logo={logo}
          size={size}
          handleDownload={handleDownload}
          handleDownloadSVG={handleDownloadSVG}
        />

        {history.length > 0 && (
          <QRHistoryPanel
            history={history}
            setText={setText}
            clearHistory={clearHistory}
          />
        )}
      </main>
    </div>
  );
}
