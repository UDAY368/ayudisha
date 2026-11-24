import { ImageResponse } from "next/og";

/** 512px PNG of the emblem for Organization structured data (Google does not accept SVG logos). */
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF8F2" }}>
        <svg width="420" height="420" viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M44.5 9.6A26 26 0 1 1 22.6 7.7" stroke="#234C3D" strokeWidth="3" />
          <circle cx="35.2" cy="14.6" r="4" fill="#234C3D" />
          <path d="M33.6 20.4c-1.2 5.4-3 10-5.4 14.2" stroke="#234C3D" strokeWidth="3.4" />
          <path d="M32.6 24.2c3 1.6 5.8 2.4 8.8 2.2M32 24.4c-2.8 1.2-5.4 3.2-7.4 5.6" stroke="#234C3D" strokeWidth="3" />
          <path d="M28.2 34.6c3.2 2.6 5.8 5.8 7.4 9.6M28.2 34.6c-2.6 2.8-5.6 5-9 6.4" stroke="#234C3D" strokeWidth="3.2" />
          <path d="M43.6 47.4c.4-7.6 4.2-13.4 11-17-.2 8.2-4.2 14-11 17Z" fill="#91B49A" stroke="#234C3D" strokeWidth="2" />
          <path d="M13 50.5c6.8 3.6 13.6 3.4 20.4-.4 4.6-2.6 9-3.2 13.6-1.6" stroke="#C4A36B" strokeWidth="3" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
