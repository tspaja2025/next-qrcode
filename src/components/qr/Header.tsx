"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";

export function Header() {
  return (
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
  );
}
