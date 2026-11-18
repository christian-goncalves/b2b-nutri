import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#641D24",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>
          B2B NUTRIS
        </div>
        <div style={{ display: "flex", maxWidth: 940, flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", color: "#EABAB7", fontSize: 27 }}>
            Biblioteca científica e materiais para nutrição
          </div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 68, lineHeight: 1.08 }}>
            Conhecimento para a prática clínica
          </div>
        </div>
        <div style={{ display: "flex", width: 176, height: 10, borderRadius: 5, background: "#F2C14E" }} />
      </div>
    ),
    size,
  );
}
