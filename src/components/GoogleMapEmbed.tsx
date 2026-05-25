// Google Maps embed using an iframe — no API key required.
// We re-center the embed using `q=lat,lng` so it updates when the user's
// geolocation (or a chosen internship) changes.
import { ExternalLink } from "lucide-react";

export function GoogleMapEmbed({ lat, lng, zoom = 13, label }: { lat: number; lng: number; zoom?: number; label?: string }) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-border bg-secondary">
      <iframe
        title={label ?? "Google Map"}
        src={src}
        className="w-full h-full"
        style={{ border: 0, minHeight: 420 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={openUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow"
      >
        Open in Maps <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
