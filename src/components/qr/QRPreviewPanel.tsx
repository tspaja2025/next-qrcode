"use client";

import { CopyIcon, DownloadIcon, MessageSquareIcon } from "lucide-react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import type { QRPreviewProps } from "@/lib/types";

export function QRPreviewPanel({
  text,
  fgColor,
  bgColor,
  logo,
  size,
  handleDownload,
  handleDownloadSVG,
}: QRPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview and Download</CardTitle>
        <CardDescription>Your QR code will appear here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          {text ? (
            <QRCode
              id="qr-code"
              value={text}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              ecLevel="H"
              logoImage={logo}
              logoWidth={size / 5}
            />
          ) : (
            <Empty className="text-center h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageSquareIcon />
                </EmptyMedia>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-lg">Enter content to generate QR code</p>
              </EmptyContent>
            </Empty>
          )}
        </div>

        {text && (
          <div className="flex gap-2">
            <Button onClick={handleDownload}>
              <DownloadIcon /> Download
            </Button>
            <Button variant="outline" onClick={handleDownloadSVG}>
              <DownloadIcon /> SVG
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(text)}
            >
              <CopyIcon /> Copy
            </Button>
          </div>
        )}

        {text && (
          <div className="space-y-2">
            <Label htmlFor="preview">Preview Content</Label>
            <div className="p-3 rounded text-sm font-mono break-all text-muted-foreground">
              {text}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
