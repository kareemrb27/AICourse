import { ImageResponse } from "next/og";

export const alt = "AICourse: free AI engineering courses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1b1b24",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          <span>AI</span>
          <span
            style={{
              width: 18,
              height: 140,
              margin: "0 8px",
              background: "#10b981",
            }}
          />
          <span>Course</span>
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 40, color: "#9a9aa8" }}>
          Free, open AI engineering courses
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 28, color: "#10b981" }}>
          9 courses · 63 lessons · no signup
        </div>
      </div>
    ),
    size,
  );
}
