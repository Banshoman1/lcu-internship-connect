import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CalendarCheck, Bookmark, User, MapPin } from "lucide-react";
import { useApplications, useProfile, useSaved, profileCompletion } from "@/lib/profile-store";
import { INTERNSHIPS, skillMatch, haversineKm, LCU_LOCATION } from "@/lib/internship-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Smart Internship System" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { profile } = useProfile();
  const { applications } = useApplications();
  const { saved } = useSaved();
  const [tab, setTab] = useState<"recommend" | "notifications">("recommend");
  const completion = profileCompletion(profile);
  const initials = (profile.firstName[0] ?? "A") + (profile.lastName[0] ?? "O");

  const recommended = [...INTERNSHIPS]
    .map((i) => ({ i, score: skillMatch(i, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-xl font-bold">{initials.toUpperCase()}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {profile.firstName || "Student"}!</h1>
              <p className="text-sm opacity-80">{profile.matric} • {profile.course}</p>
            </div>
          </div>
          <Link to="/profile" className="rounded-md bg-pink text-pink-foreground px-5 py-2.5 font-semibold hover:opacity-90">Complete Profile</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Send className="h-5 w-5" />} color="bg-primary/10 text-primary" value={applications.length} label="Applications Sent" />
        <StatCard icon={<CalendarCheck className="h-5 w-5" />} color="bg-pink-soft text-pink" value={applications.filter((a) => a.status === "Interview").length} label="Interviews Scheduled" />
        <StatCard icon={<Bookmark className="h-5 w-5" />} color="bg-success/15 text-success" value={saved.length} label="Saved Internships" />
        <StatCard icon={<User className="h-5 w-5" />} color="bg-accent text-primary" value={`${completion}%`} label="Profile Completion" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex border-b border-border">
              {(["recommend","notifications"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
                  {t === "recommend" ? "Recommendations" : "Notifications"}
                </button>
              ))}
            </div>
            <div className="p-5">
              {tab === "recommend" ? (
                <ul className="divide-y divide-border">
                  {recommended.map(({ i, score }) => (
                    <li key={i.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <Link to="/internships/$id" params={{ id: i.id }} className="font-semibold hover:underline">{i.title}</Link>
                        <div className="text-xs text-muted-foreground">{i.company} • {haversineKm(LCU_LOCATION, i).toFixed(1)} km</div>
                      </div>
                      <span className="rounded-full bg-success/15 text-success px-3 py-1 text-xs font-semibold">{score}% match</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3"><MapPin className="h-4 w-4 text-pink mt-0.5" /> Andela Nigeria interview scheduled — April 10, 2026</li>
                  <li className="flex gap-3"><MapPin className="h-4 w-4 text-pink mt-0.5" /> 94% skill match: new Paystack opening</li>
                  <li className="flex gap-3"><MapPin className="h-4 w-4 text-pink mt-0.5" /> MTN Nigeria is reviewing your application</li>
                </ul>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-semibold">Recent Applications</h3>
              <Link to="/applications" className="text-sm text-pink font-medium">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="px-5 py-2">Company</th><th>Position</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr><td className="px-5 py-6 text-center text-muted-foreground" colSpan={4}>No applications yet</td></tr>
                  ) : applications.slice(0, 5).map((a) => {
                    const i = INTERNSHIPS.find((x) => x.id === a.internshipId);
                    if (!i) return null;
                    return (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-5 py-3 font-medium">{i.company}</td>
                        <td>{i.title}</td>
                        <td>{new Date(a.date).toLocaleDateString()}</td>
                        <td><span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{a.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold">Your Profile</h3>
            <div className="mt-4 grid place-items-center">
              <div className="grid h-20 w-20 place-items-center rounded-full text-xl font-bold text-pink-foreground"
                style={{ background: "linear-gradient(135deg, oklch(0.55 0.2 320), oklch(0.45 0.2 280))" }}>
                {initials.toUpperCase()}
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold">{profile.firstName} {profile.lastName}</div>
                <div className="text-xs text-muted-foreground">{profile.course}</div>
              </div>
            </div>
            <Link to="/profile" className="mt-5 block text-center rounded-md bg-primary text-primary-foreground py-2 font-semibold">Edit Profile</Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold">Quick Actions</h3>
            <ul className="mt-3 space-y-2">
              <QuickLink to="/map" label="Find Nearby Internships" />
              <QuickLink to="/internships" label="Browse All Internships" />
              <QuickLink to="/applications" label="Track Applications" />
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function StatCard({ icon, color, value, label }: { icon: React.ReactNode; color: string; value: number | string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
      <div className={`grid h-11 w-11 place-items-center rounded-lg ${color}`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function QuickLink({ to, label }: { to: "/map" | "/internships" | "/applications"; label: string }) {
  return (
    <li>
      <Link to={to} className="flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm hover:bg-pink-soft">
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-pink" /> {label}</span>
        <span>→</span>
      </Link>
    </li>
  );
}
