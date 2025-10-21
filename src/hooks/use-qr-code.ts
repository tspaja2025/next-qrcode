import { useEffect, useState } from "react";
import type { QRHistoryItem, QRSettings } from "@/lib/types";

export function useQRCode() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState<string | undefined>();
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qrSettings");
      if (saved) {
        const parsed = JSON.parse(saved) as QRSettings;
        setText(parsed.text || "");
        setSize(parsed.size || 256);
        setFgColor(parsed.fgColor || "#000000");
        setBgColor(parsed.bgColor || "#ffffff");
        if (parsed.logo) setLogo(parsed.logo);
      }

      const savedHistory = localStorage.getItem("qrHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error("Failed to load settings/history", err);
    }
  }, []);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(
      "qrSettings",
      JSON.stringify({ text, size, fgColor, bgColor, logo }),
    );
  }, [text, size, fgColor, bgColor, logo]);

  // Add to history
  const addToHistory = (text: string, logo?: string) => {
    if (!text.trim()) return;
    const newItem: QRHistoryItem = {
      id: crypto.randomUUID(),
      text,
      date: new Date().toISOString(),
      logo,
    };

    const updated = [newItem, ...history].slice(0, 10); // keep last 10
    setHistory(updated);
    localStorage.setItem("qrHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("qrHistory");
  };

  return {
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
  };
}
