export const downloadQRAsPNG = (id: string, filename = "qrcode.png") => {
  const element = document.getElementById(id);

  if (!element) {
    console.error("QR element not found:", id);
    return;
  }

  // If it's a canvas (default from react-qrcode-logo)
  if (element instanceof HTMLCanvasElement) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = element.toDataURL("image/png");
    link.click();
    return;
  }

  // If it's an SVG (fallback)
  if (element instanceof SVGElement) {
    const svgData = new XMLSerializer().serializeToString(element);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const width = element.getAttribute("width") || "256";
    const height = element.getAttribute("height") || "256";
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = filename;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    return;
  }

  console.error("Unsupported QR element type:", element.nodeName);
};

export const downloadQRAsSVG = (
  text: string,
  fgColor: string,
  bgColor: string,
  size: number,
  filename = "qrcode.svg",
) => {
  // SVG template manually generated
  const encoded = encodeURIComponent(text);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="background:${bgColor};width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
      <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=${size}x${size}&color=${fgColor.replace(
        "#",
        "",
      )}&bgcolor=${bgColor.replace("#", "")}" alt="QR Code" />
    </div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};
