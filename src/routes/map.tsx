import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Navigation, RefreshCcw } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { INTERNSHIPS, LCU_COURSES, LCU_LOCATION, haversineKm, skillMatch, type WorkType } from "@/lib/internship-data";
import { useProfile } from "@/lib/profile-store";
import { toast } from "sonner";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Map & Location — Smart Internship System" }] }),
  component: MapPage,
});

const WORK_TYPES: ("All" | WorkType)[] = ["All", "Remote", "On-Site", "Hybrid"];

function MapPage() {
  const { profile } = useProfile();
  const [origin, setOrigin] = useState<{ lat: number; lng: number }>({ lat: LCU_LOCATION.lat, lng: LCU_LOCATION.lng });
  const [originLabel, setOriginLabel] = useState<string>(LCU_LOCATION.label);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [course, setCourse] = useState<string>("All Courses");
  const [work, setWork] = useState<"All" | WorkType>("All");
  const [sortBy, setSortBy] = useState<"distance" | "match">("distance");
  const [focused, setFocused] = useState(INTERNSHIPS[0]);

  // 1. Location Detection — browser geolocation; falls back to LCU on denial.
  const enableGPS = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setOriginLabel(`Your current location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        setGpsEnabled(true);
        toast.success("GPS location detected");
      },
      () => toast.error("Permission denied — using LCU as fallback"),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const results = useMemo(() => {
    let r = INTERNSHIPS.filter((i) => (work === "All" ? true : i.workType === work));
    if (course !== "All Courses") r = r.filter((i) => i.course === course);
    return r
      .map((i) => ({ i, km: haversineKm(origin, i), match: skillMatch(i, profile) }))
      .sort((a, b) => (sortBy === "distance" ? a.km - b.km : b.match - a.match));
  }, [origin, course, work, sortBy, profile]);

  return (
    <>
      <PageHero
        title="Map & Location Search"
        subtitle="Your GPS location is detected automatically — click any internship to see it on the live map"
      />
      <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className={`grid h-9 w-9 place-items-center rounded-full ${gpsEnabled ? "bg-success/15 text-success" : "bg-pink-soft text-pink"}`}>
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-sm">Your Location</div>
                <div className="text-xs text-muted-foreground">{gpsEnabled ? "GPS detected" : "Enable to sort by real distance"}</div>
              </div>
            </div>
            {gpsEnabled && (
              <div className="mt-3 rounded-md bg-success/10 text-success px-3 py-2 text-xs">{originLabel}</div>
            )}
            <button
              onClick={enableGPS}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"
            >
              <Navigation className="h-4 w-4" /> {gpsEnabled ? "Update Location" : "Enable GPS Location"}
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <label className="text-sm font-semibold">Filter by Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
            >
              <option>All Courses</option>
              {LCU_COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {course !== "All Courses" && (
              <p className="mt-2 text-xs text-muted-foreground">
                {results.length} internships match your course
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold">Work Type</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {WORK_TYPES.map((w) => (
                <button
                  key={w}
                  onClick={() => setWork(w)}
                  className={`rounded-full px-3 py-1 text-xs font-medium border ${work === w ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
                >{w}</button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => setSortBy("distance")} className={`rounded-md px-3 py-2 text-xs font-semibold ${sortBy==="distance" ? "bg-pink text-pink-foreground" : "border border-border"}`}>By Distance</button>
              <button onClick={() => setSortBy("match")} className={`rounded-md px-3 py-2 text-xs font-semibold ${sortBy==="match" ? "bg-pink text-pink-foreground" : "border border-border"}`}>By Match</button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">All Internships</div>
              <span className="rounded-full bg-pink-soft text-pink px-2 py-0.5 text-xs">{results.length}</span>
            </div>
            <ul className="mt-3 max-h-96 overflow-y-auto divide-y divide-border">
              {results.map(({ i, km, match }) => (
                <li key={i.id}>
                  <button
                    onClick={() => setFocused(i)}
                    className={`w-full text-left py-3 px-2 rounded-md hover:bg-secondary ${focused.id === i.id ? "bg-secondary" : ""}`}
                  >
                    <div className="font-semibold text-sm">{i.title}</div>
                    <div className="text-xs text-muted-foreground">{i.company}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="text-pink font-semibold">{km.toFixed(1)} km</span>
                      <span className="text-success font-semibold">{match}% match</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Map area */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-pink" /> {gpsEnabled ? "Showing your current location" : originLabel}
            </div>
            <button onClick={enableGPS} className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
              <RefreshCcw className="h-3 w-3" /> Refresh
            </button>
          </div>
          <GoogleMapEmbed lat={focused.lat} lng={focused.lng} label={focused.company} />
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{focused.title}</h3>
                <p className="text-sm text-muted-foreground">{focused.company} • {focused.location}</p>
                <p className="mt-2 text-sm">{focused.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Distance</div>
                <div className="font-bold text-pink">{haversineKm(origin, focused).toFixed(1)} km</div>
                <div className="mt-2 text-xs text-muted-foreground">Skill Match</div>
                <div className="font-bold text-success">{skillMatch(focused, profile)}%</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
