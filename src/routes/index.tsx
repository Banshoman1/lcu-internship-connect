import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, LayoutDashboard, Sparkles, Filter, Bell, ListChecks, Navigation } from "lucide-react";
import { INTERNSHIPS, LCU_LOCATION, haversineKm, skillMatch } from "@/lib/internship-data";
import { useProfile } from "@/lib/profile-store";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { InternshipCard } from "@/components/InternshipCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Internship System — Lead City University" },
      { name: "description", content: "AI-powered internship matching with real-time Google Maps location detection for LCU students." },
    ],
  }),
  component: Home,
});

function Home() {
  const { profile } = useProfile();
  const featured = [...INTERNSHIPS]
    .map((i) => ({ i, km: haversineKm(LCU_LOCATION, i), match: skillMatch(i, profile) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 4)
    .map((x) => x.i);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-pink" />
              LCU/UG/22/21894 • Lead City University
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              SMART<br /><span className="text-pink">INTERNSHIP</span><br />SYSTEM
            </h1>
            <p className="mt-5 font-semibold tracking-wide">USING SKILL MATCHING ALGORITHMS</p>
            <p className="mt-2 italic text-sm opacity-90">
              Developed by <span className="text-pink not-italic font-semibold">Asake OLAOLUWA Ayomide</span>
            </p>
            <p className="mt-5 max-w-lg text-sm md:text-base opacity-90">
              Discover internship opportunities near you using AI-powered skill matching and real-time
              Google Maps location detection. Built exclusively for Lead City University students.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/map" className="inline-flex items-center gap-2 rounded-md bg-pink text-pink-foreground px-5 py-3 font-semibold hover:opacity-90">
                <MapPin className="h-4 w-4" /> Find Internships Near Me
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-white/15 backdrop-blur px-5 py-3 font-semibold hover:bg-white/25">
                <LayoutDashboard className="h-4 w-4" /> View Dashboard
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[{n:"500+",l:"Internships Listed"},{n:"80+",l:"LCU Courses"},{n:"200+",l:"Partner Companies"}].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold">{s.n}</div>
                  <div className="text-xs opacity-80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mac-style window with map */}
          <div className="rounded-2xl bg-card shadow-2xl overflow-hidden text-foreground">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary">
              <span className="h-3 w-3 rounded-full bg-destructive" />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "oklch(0.82 0.18 85)" }} />
              <span className="h-3 w-3 rounded-full bg-success" />
              <span className="ml-3 text-sm font-medium">Smart Internship Map</span>
            </div>
            <div className="p-3">
              <GoogleMapEmbed lat={LCU_LOCATION.lat} lng={LCU_LOCATION.lng} label="LCU Map" />
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Andela Nigeria</div>
                <div className="text-xs text-muted-foreground">2.4 km away</div>
              </div>
              <span className="rounded-full bg-success/15 text-success px-3 py-1 text-xs font-semibold">95% match</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-pink">Key Features</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Everything You Need to Find Your Perfect Internship</h2>
          <p className="mt-3 text-muted-foreground">
            Location intelligence, skill matching, and real-time data — connecting LCU students with the best opportunities.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { i: MapPin, t: "Location-Based Detection", d: "Browser geolocation + Google Maps to surface nearby opportunities." },
            { i: Sparkles, t: "Skill Matching Algorithm", d: "Ranks every internship with a compatibility percentage." },
            { i: Filter, t: "Smart Filtering", d: "Filter by skills, stipend, duration, remote / on-site / hybrid." },
            { i: Bell, t: "Real-Time Notifications", d: "Instant alerts on new matches and application updates." },
            { i: ListChecks, t: "Application Tracking", d: "Visual timeline from submission to decision." },
            { i: Navigation, t: "Distance Sorting", d: "Opportunities are ranked by distance from your location." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-pink-soft text-pink">
                <f.i className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-sm font-semibold text-pink">How It Works</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">From Student to Intern in 4 Simple Steps</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Set Up Your Profile", d: "Enter your course, skills, and preferences." },
              { n: "02", t: "Detect Your Location", d: "Allow location access and we find opportunities near LCU." },
              { n: "03", t: "Discover Matches", d: "Our algorithm ranks internships by compatibility." },
              { n: "04", t: "Apply & Track", d: "Apply directly and track your status in real-time." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl bg-card border border-border p-6">
                <div className="text-4xl font-bold text-pink">{s.n}</div>
                <h3 className="mt-3 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/profile" className="inline-flex rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured opportunities */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-semibold text-pink">Featured Opportunities</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Top Internships This Week</h2>
          </div>
          <Link to="/internships" className="text-primary font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((i) => <InternshipCard key={i.id} internship={i} />)}
        </div>
      </section>

      {/* Big stats */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{n:"500+",l:"Active Internships"},{n:"200+",l:"Partner Companies"},{n:"80+",l:"LCU Courses Covered"},{n:"95%",l:"Placement Rate"}].map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-bold text-pink">{s.n}</div>
              <div className="text-sm opacity-90">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-pink">Student Stories</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">What LCU Students Say</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Chukwuemeka Obi", c: "Software Engineering, 400L", q: "The skill matching algorithm found me an internship at MTN Nigeria that perfectly matched my React and Node.js skills. The map feature showed it was only 3km from campus!" },
            { n: "Fatima Abdullahi", c: "Accounting, 300L", q: "I applied to Deloitte Nigeria through this system and got an interview within a week. The application tracking kept me updated every step." },
            { n: "Adebayo Ogundimu", c: "Civil Engineering, 400L", q: "Found my Julius Berger internship through the location detection feature. It showed me companies within 10km of LCU that needed civil engineering interns." },
          ].map((t) => (
            <div key={t.n} className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-foreground">“{t.q}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-pink text-pink-foreground font-bold">{t.n[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.c}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-soft">
        <div className="mx-auto max-w-3xl text-center px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Find Your Internship?</h2>
          <p className="mt-3 text-muted-foreground">
            Join hundreds of LCU students who have found their dream internships using our smart matching system.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/map" className="rounded-md bg-primary text-primary-foreground px-5 py-3 font-semibold">Detect My Location</Link>
            <Link to="/internships" className="rounded-md bg-pink text-pink-foreground px-5 py-3 font-semibold">Browse Internships</Link>
          </div>
        </div>
      </section>
    </>
  );
}
