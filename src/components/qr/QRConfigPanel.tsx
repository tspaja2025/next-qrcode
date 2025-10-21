"use client";

import { ImageIcon, Link2Icon, MailIcon, WifiIcon } from "lucide-react";
import { useCallback } from "react";
import { ColorField } from "@/components/qr/ColorField";
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
import type { QRConfigProps } from "@/lib/types";

export function QRConfigPanel({
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
}: QRConfigProps) {
  const setQuickTemplate = useCallback(
    (template: string, value: string) => {
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
    },
    [setText],
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
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
                onClick={() => setQuickTemplate("url", "https://example.com")}
              >
                <Link2Icon /> URL
              </Button>
              <Button
                variant="outline"
                onClick={() => setQuickTemplate("email", "email@example.com")}
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
  );
}
