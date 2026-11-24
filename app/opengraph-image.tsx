import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "AyuDisha — Your Path to Natural Wellbeing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FAF8F2", position: "relative", padding: 80 }}>
        <svg width="620" height="620" viewBox="0 0 100 100" style={{ position: "absolute", right: -120, top: 5 }}>
          <path d="M74 9.5A44 44 0 1 1 30 8.8" fill="none" stroke="#C4A36B" strokeWidth="0.35" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <svg width="140" height="140" viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M44.5 9.6A26 26 0 1 1 22.6 7.7" stroke="#234C3D" strokeWidth="2.4" />
            <circle cx="35.2" cy="14.6" r="3.6" fill="#234C3D" />
            <path d="M33.6 20.4c-1.2 5.4-3 10-5.4 14.2" stroke="#234C3D" strokeWidth="2.8" />
            <path d="M32.6 24.2c3 1.6 5.8 2.4 8.8 2.2M32 24.4c-2.8 1.2-5.4 3.2-7.4 5.6" stroke="#234C3D" strokeWidth="2.4" />
            <path d="M28.2 34.6c3.2 2.6 5.8 5.8 7.4 9.6M28.2 34.6c-2.6 2.8-5.6 5-9 6.4" stroke="#234C3D" strokeWidth="2.6" />
            <path d="M43.6 47.4c.4-7.6 4.2-13.4 11-17-.2 8.2-4.2 14-11 17Z" fill="#91B49A" stroke="#234C3D" strokeWidth="1.6" />
            <path d="M13 50.5c6.8 3.6 13.6 3.4 20.4-.4 4.6-2.6 9-3.2 13.6-1.6" stroke="#C4A36B" strokeWidth="2.4" />
          </svg>
          <div style={{ marginTop: 40, fontSize: 96, letterSpacing: 18, color: "#19382D", fontWeight: 600 }}>{site.wordmark}</div>
          <div style={{ marginTop: 12, width: 120, height: 2, background: "#C4A36B" }} />
          <div style={{ marginTop: 28, fontSize: 40, color: "#234C3D" }}>{site.tagline}</div>
          <div style={{ marginTop: 18, fontSize: 26, color: "#57675D" }}>Ayurveda · Physiotherapy · Naturopathy · Chiropractic care</div>
        </div>
      </div>
    ),
    size
  );
}
