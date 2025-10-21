"use client";

import { HistoryIcon, TrashIcon } from "lucide-react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QRHistoryProps } from "@/lib/types";

export function QRHistoryPanel({
  history,
  setText,
  clearHistory,
}: QRHistoryProps) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <HistoryIcon /> <CardTitle>History</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          <TrashIcon className="mr-1" /> Clear
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => setText(item.text)}
            className="border rounded p-2 hover:bg-muted transition flex flex-col items-center text-xs text-muted-foreground"
          >
            <QRCode
              value={item.text}
              size={80}
              fgColor="#000"
              bgColor="#fff"
              logoImage={item.logo}
            />
            <span className="truncate mt-1">{item.text.slice(0, 20)}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
