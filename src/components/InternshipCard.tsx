import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin } from "lucide-react";
import type { Internship } from "@/lib/internship-data";
import { skillMatch, haversineKm, LCU_LOCATION } from "@/lib/internship-data";
import { useApplications, useProfile, useSaved } from "@/lib/profile-store";
import { toast } from "sonner";

// Card used in Internships list, Map sidebar, and Home featured grid.
export function InternshipCard({ internship, origin }: { internship: Internship; origin?: { lat: number; lng: number } }) {
  const { profile } = useProfile();
  const { apply, applications } = useApplications();
  const { saved, toggle } = useSaved();

  const match = skillMatch(internship, profile);
  const km = haversineKm(origin ?? LCU_LOCATION, internship);
  const isApplied = applications.some((a) => a.internshipId === internship.id);
  const isSaved = saved.includes(internship.id);

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-wide rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
          {internship.workType}
        </span>
        <button onClick={() => toggle(internship.id)} aria-label="Save" className="text-muted-foreground hover:text-pink">
          <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{internship.title}</h3>
      <p className="text-sm text-muted-foreground">{internship.company}</p>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-pink" />
        {internship.location} • {km.toFixed(1)} km away
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Skill Match</div>
          <div className="text-pink font-bold">{match}%</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Stipend</div>
          <div className="font-semibold text-foreground">₦{internship.stipend.toLocaleString()}/mo</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to="/internships/$id"
          params={{ id: internship.id }}
          className="flex-1 text-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
        >
          View
        </Link>
        <button
          onClick={() => {
            if (isApplied) { toast.info("Already applied"); return; }
            apply(internship.id);
            toast.success(`Applied to ${internship.company}`);
          }}
          className="flex-1 rounded-md bg-pink text-pink-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"
        >
          {isApplied ? "Applied" : "Apply →"}
        </button>
      </div>
    </article>
  );
}
