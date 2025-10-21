"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ColorFieldProps } from "@/lib/types";

export function ColorField({ id, label, color, setColor }: ColorFieldProps) {
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
