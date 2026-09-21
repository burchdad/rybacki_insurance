import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt =
  "Rybacki Insurance Agency — Clear health coverage guidance without the pressure.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#171717",
        color: "#fff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 85,
      }}
    >
      <div
        style={{
          fontSize: 25,
          letterSpacing: 6,
          color: "#c9ab67",
          marginBottom: 40,
        }}
      >
        {site.name.toUpperCase()}
      </div>
      <div style={{ fontSize: 70, lineHeight: 1.1, maxWidth: 950 }}>
        Paying Too Much for Health Insurance?
      </div>
      <div style={{ fontSize: 27, color: "#dddddd", marginTop: 40 }}>
        {`Personal guidance · Tyler, Texas · ${site.phone}`}
      </div>
    </div>,
    size,
  );
}
