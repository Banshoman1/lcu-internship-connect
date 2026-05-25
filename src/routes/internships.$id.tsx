import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { INTERNSHIPS, haversineKm, skillMatch, LCU_LOCATION } from "@/lib/internship-data";
import { useApplications, useProfile, useSaved } from "@/lib/profile-store";
import { toast } from "sonner";

export const Route = createFileRoute("/internships/$id")({
  component: InternshipDetail,
});

function InternshipDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const internship = INTERNSHIPS.find((i) => i.id === id);
  const { profile } = useProfile();
  const { apply, applications } = useApplications();
  const { saved, toggle } = useSaved();

  if (!internship) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Internship not found</h1>
        <Link to="/internships" className="mt-4 inline-block text-primary">Back to listings</Link>
      </div>
    );
  }

  const isApplied = applications.some((a) => a.internshipId === internship.id);
  const isSaved = saved.includes(internship.id);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <button onClick={() => navigate({ to: "/internships" })} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </button>
      <div className="mt-5 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <span className="text-xs uppercase rounded-full bg-secondary px-3 py-1">{internship.workType}</span>
          <h1 className="mt-3 text-3xl font-bold">{internship.title}</h1>
          <p className="text-muted-foreground">{internship.company}</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-pink" /> {internship.location} • {haversineKm(LCU_LOCATION, internship).toFixed(1)} km from LCU
          </div>
          <p className="mt-5 text-sm">{internship.description}</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Stipend" value={`₦${internship.stipend.toLocaleString()}/mo`} />
            <Stat label="Duration" value={`${internship.durationMonths} months`} />
            <Stat label="Course" value={internship.course} />
            <Stat label="Skill Match" value={`${skillMatch(internship, profile)}%`} />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Required Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {internship.requiredSkills.map((s) => (
                <span key={s} className="rounded-full bg-pink-soft text-primary px-3 py-1 text-xs">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <GoogleMapEmbed lat={internship.lat} lng={internship.lng} label={internship.company} />
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 h-fit">
          <button
            onClick={() => {
              if (isApplied) { toast.info("Already applied"); return; }
              apply(internship.id);
              toast.success(`Applied to ${internship.company}`);
            }}
            className="w-full rounded-md bg-pink text-pink-foreground px-4 py-3 font-semibold hover:opacity-90"
          >
            {isApplied ? "Application Submitted" : "Apply for Internship"}
          </button>
          <button onClick={() => toggle(internship.id)} className="mt-3 w-full rounded-md border border-border px-4 py-3 font-semibold hover:bg-secondary">
            {isSaved ? "Saved ✓" : "Save for later"}
          </button>
          <div className="mt-5 text-xs text-muted-foreground">
            By applying you agree to share your LCU profile with {internship.company}.
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}
