import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Ombu Grill - Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(230,57,70,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(244,162,97,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(24,24,27,0.9)",
            border: "2px solid #3f3f46",
            borderRadius: 24,
            padding: "48px 80px",
            maxWidth: 1080,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              letterSpacing: -2,
              marginBottom: 16,
            }}
          >
            OMBU GRILL
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#e63946",
              marginBottom: 8,
            }}
          >
            Utah&apos;s #1 All-You-Can-Eat
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#9ca3af",
              marginBottom: 40,
            }}
          >
            Korean BBQ & Hot Pot
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 28px",
                borderRadius: 25,
                border: "2px solid #e63946",
                color: "#e63946",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              From $16.99
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 28px",
                borderRadius: 25,
                border: "2px solid #2a9d8f",
                color: "#2a9d8f",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              6 Locations
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 28px",
                borderRadius: 25,
                border: "2px solid #f4a261",
                color: "#f4a261",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Open Daily
            </div>
          </div>

          {/* URL */}
          <div style={{ fontSize: 20, color: "#6b7280" }}>
            ombugrillutah.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
