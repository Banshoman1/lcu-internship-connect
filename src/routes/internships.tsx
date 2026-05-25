import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InternshipCard } from "@/components/InternshipCard";
import { INTERNSHIPS, POPULAR_SKILLS, haversineKm, skillMatch, LCU_LOCATION, type WorkType } from "@/lib/internship-data";
import { useProfile } from "@/lib/profile-store";

export const Route = createFileRoute("/internships")({
  head: () => ({ meta: [{ title: "Internship Listings — Smart Internship System" }] }),
  component: InternshipsPage,
});

const WORK_TYPES: ("All" | WorkType)[] = ["All", "Remote", "On-Site", "Hybrid"];

function InternshipsPage() {
  const { profile } = useProfile();
  const [q, setQ] = useState("");
  const [work, setWork] = useState<"All" | WorkType>("All");
  const [minStipend, setMinStipend] = useState(0);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [sort, setSort] = useState<"match" | "distance" | "stipend">("match");

  const toggleSkill = (s: string) =>
    setActiveSkills((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));

  const results = useMemo(() => {
    let r = INTERNSHIPS;
    if (q) {
      const lc = q.toLowerCase();
      r = r.filter((i) =>
        i.title.toLowerCase().includes(lc) ||
        i.company.toLowerCase().includes(lc) ||
        i.requiredSkills.some((s) => s.toLowerCase().includes(lc))
      );
    }
    if (work !== "All") r = r.filter((i) => i.workType === work);
    if (minStipend > 0) r = r.filter((i) => i.stipend >= minStipend);
    if (activeSkills.length) r = r.filter((i) => activeSkills.every((s) => i.requiredSkills.some((rs) => rs.toLowerCase() === s.toLowerCase())));
    return r.sort((a, b) => {
      if (sort === "distance") return haversineKm(LCU_LOCATION, a) - haversineKm(LCU_LOCATION, b);
      if (sort === "stipend") return b.stipend - a.stipend;
      return skillMatch(b, profile) - skillMatch(a, profile);
    });
  }, [q, work, minStipend, activeSkills, sort, profile]);

  return (
    <>
      <PageHero title="Internship Listings" subtitle="Browse and apply to internships matched to your skills and course" />
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Search + filters bar */}
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, company, or skill..."
              className="w-full rounded-md border border-input bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {WORK_TYPES.map((w) => (
              <button key={w} onClick={() => setWork(w)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold border ${work === w ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{w}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-md border border-input bg-card px-3 py-2 text-sm">
            <option value="match">Sort: Best Match</option>
            <option value="distance">Sort: Distance</option>
            <option value="stipend">Sort: Stipend</option>
          </select>
        </div>

        <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">Refine Results</h3>
              <div className="mt-4">
                <label className="text-sm">Min Stipend (₦)</label>
                <input type="range" min={0} max={100000} step={5000} value={minStipend}
                  onChange={(e) => setMinStipend(Number(e.target.value))} className="w-full mt-2 accent-[oklch(0.32_0.14_265)]" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₦0</span><span>₦{minStipend.toLocaleString()}</span><span>₦100k</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-sm font-semibold">Popular Skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {POPULAR_SKILLS.map((s) => (
                    <button key={s} onClick={() => toggleSkill(s)}
                      className={`rounded-full px-3 py-1 text-xs border ${activeSkills.includes(s) ? "bg-pink text-pink-foreground border-pink" : "bg-pink-soft text-primary border-transparent"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setQ(""); setWork("All"); setMinStipend(0); setActiveSkills([]); }}
                className="mt-5 w-full rounded-md border border-pink text-pink py-2 text-sm font-semibold hover:bg-pink-soft">
                Clear All Filters
              </button>
            </div>
          </aside>

          <div>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{results.length}</span> internships
            </div>
            {results.length === 0 ? (
              <div className="rounded-xl border border-border bg-card py-16 text-center text-muted-foreground">
                No internships found. Try adjusting your filters.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((i) => <InternshipCard key={i.id} internship={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
