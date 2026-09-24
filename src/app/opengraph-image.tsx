import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// The card people see when the link is shared on LinkedIn or Slack.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background: "#0b0c0f",
          color: "#ece9e3",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, color: "#7ba5de", letterSpacing: 5 }}>
            {profile.role.toUpperCase()}
          </div>
          <div style={{ fontSize: 22, color: "#918d86", letterSpacing: 3 }}>SFAX, TUNISIA</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 600, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#918d86", marginTop: 18, maxWidth: 900, lineHeight: 1.3 }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 54, height: 2, background: "#7ba5de" }} />
          <div style={{ fontSize: 22, color: "#918d86" }}>
            Payments · AI pipelines · Client products
          </div>
        </div>
      </div>
    ),
    size,
  );
}
