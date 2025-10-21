"use client";

import {
  CopyIcon,
  DownloadIcon,
  HistoryIcon,
  ImageIcon,
  Link2Icon,
  MailIcon,
  MessageSquareIcon,
  TrashIcon,
  WifiIcon,
} from "lucide-react";
import { useCallback } from "react";
import { QRCode } from "react-qrcode-logo";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const setQuickTemplate = (template: string, value: string) => {
    switch (template) {
      case "url":
        setText(value || "https://");
        break;
      case "email":
        setText(value ? `mailto:${value}` : "mailto:");
        break;
      case "sms":
        setText(value ? `sms:${value}` : "sms:");
        break;
      case "wifi":
        setText("WIFI:T:WPA;S:NetworkName;P:Password;;");
        break;
    }
  };

  const handleDownload = useCallback(() => {
    if (text) addToHistory(text, logo);
    downloadQRAsPNG("qr-code");
  }, [text, logo, addToHistory]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="font-sans min-h-screen">
      <header className="flex items-center justify-between px-4 py-2">
        <div>
          <h4 className="text-lg font-semibold tracking-tight">
            QR Code Generator
          </h4>
          <p className="text-sm text-muted-foreground">
            Create custom QR codes instantly for URLs, contacts, WiFi, and more
          </p>
        </div>
        <DarkModeToggle />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 max-w-6xl mx-auto">
        {/* Config Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Configure your QR code</CardTitle>
            <CardDescription>
              Enter your content and customize the appearance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text">
              <TabsList className="w-full">
                <TabsTrigger value="text">Text/URL</TabsTrigger>
                <TabsTrigger value="wifi">WiFi</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Content</Label>
                  <Input
                    id="text"
                    placeholder="Enter text or URL"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sms">SMS Number</Label>
                  <Input
                    id="sms"
                    placeholder="+1234567890"
                    onChange={(e) => setQuickTemplate("sms", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setQuickTemplate("url", "https://example.com")
                    }
                  >
                    <Link2Icon /> URL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setQuickTemplate("email", "email@example.com")
                    }
                  >
                    <MailIcon /> Email
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="wifi" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Format: WIFI:T:WPA;S:NetworkName;P:Password;;
                </p>
                <div className="space-y-2">
                  <Label htmlFor="wifi">WiFi Configuration</Label>
                  <Input
                    id="wifi"
                    placeholder="WIFI:T:WPA;S:MyNetwork;P:MyPassword;;"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setQuickTemplate("wifi", "")}
                >
                  <WifiIcon /> WiFi Template
                </Button>
              </TabsContent>
            </Tabs>

            {/* Settings */}
            <h4 className="leading-none font-semibold my-4">Settings</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size: {size}px</Label>
                <Slider
                  id="size"
                  min={128}
                  max={512}
                  step={32}
                  value={[size]}
                  onValueChange={(values) => setSize(values[0])}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ColorField
                  id="fgColor"
                  label="Foreground Color"
                  color={fgColor}
                  setColor={setFgColor}
                />
                <ColorField
                  id="bgColor"
                  label="Background Color"
                  color={bgColor}
                  setColor={setBgColor}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo (optional)</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  {logo && <ImageIcon className="text-green-500" />}
                  {logo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLogo(undefined)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
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
                <EmptyState />
              )}
            </div>

            {text && (
              <div className="flex gap-2">
                <Button onClick={handleDownload}>
                  <DownloadIcon /> Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadQRAsSVG(text, fgColor, bgColor, size)}
                >
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

        {/* History Panel */}
        {history.length > 0 && (
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
                  <span className="truncate mt-1">
                    {item.text.slice(0, 20)}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

function ColorField({
  id,
  label,
  color,
  setColor,
}: {
  id: string;
  label: string;
  color: string;
  setColor: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center">
      <MessageSquareIcon className="size-16 mx-auto opacity-50" />
      <p className="text-lg">Enter content to generate QR code</p>
    </div>
  );
}
