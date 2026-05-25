import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Mail, Phone, MapPin, Linkedin, Github, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useProfile, DEFAULT_PROFILE, type StudentProfile } from "@/lib/profile-store";
import { LCU_COURSES, POPULAR_SKILLS } from "@/lib/internship-data";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Smart Internship System" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, save } = useProfile();
  const [draft, setDraft] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [tab, setTab] = useState<"personal" | "skills" | "preferences">("personal");
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => { setDraft(profile); }, [profile]);

  const set = <K extends keyof StudentProfile>(k: K, v: StudentProfile[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const initials = (draft.firstName[0] ?? "?") + (draft.lastName[0] ?? "?");

  return (
    <>
      <PageHero
        title="Complete Your Profile"
        subtitle="Enter your matric number • Select your course • Select your level"
        action={
          <button onClick={() => { save(draft); toast.success("Profile saved"); }}
            className="inline-flex items-center gap-2 rounded-md bg-pink text-pink-foreground px-5 py-2.5 font-semibold hover:opacity-90">
            <Save className="h-4 w-4" /> Save Profile
          </button>
        }
      />
      <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full text-2xl font-bold text-pink-foreground"
              style={{ background: "linear-gradient(135deg, oklch(0.55 0.2 320), oklch(0.45 0.2 280))" }}>
              {initials.toUpperCase()}
            </div>
            <div className="mt-3 font-semibold">{draft.firstName || "Your"} {draft.lastName || "Name"}</div>
            <div className="text-xs text-muted-foreground">{draft.matric || "Matric Number"}</div>
            <div className="text-xs text-muted-foreground">{draft.course || "Course/Department"}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 space-y-2 text-sm">
            <div className="text-xs font-semibold text-muted-foreground tracking-wide">CONTACT</div>
            <Row icon={<Mail className="h-4 w-4" />} value={draft.email || "Add email"} />
            <Row icon={<Phone className="h-4 w-4" />} value={draft.phone || "Add phone"} />
            <Row icon={<MapPin className="h-4 w-4 text-pink" />} value="Lead City University, Ibadan" />
            <Row icon={<Linkedin className="h-4 w-4" />} value="Add LinkedIn" />
            <Row icon={<Github className="h-4 w-4" />} value="Add GitHub" />
          </div>
        </aside>

        <div className="rounded-xl border border-border bg-card">
          <div className="flex border-b border-border">
            {(["personal","skills","preferences"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-semibold border-b-2 capitalize ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
                {t === "personal" ? "Personal Info" : t}
              </button>
            ))}
          </div>

          {tab === "personal" && (
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              <Field label="First Name"><input value={draft.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Enter your first name" className="input" /></Field>
              <Field label="Last Name"><input value={draft.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Enter your last name" className="input" /></Field>
              <Field label="Matric Number"><input value={draft.matric} onChange={(e) => set("matric", e.target.value)} placeholder="e.g. LCU/UG/22/21894" className="input" /></Field>
              <Field label="Email Address"><input value={draft.email} onChange={(e) => set("email", e.target.value)} placeholder="your.email@example.com" className="input" /></Field>
              <Field label="Phone Number"><input value={draft.phone} onChange={(e) => set("phone", e.target.value)} placeholder="e.g. +234 803 456 7890" className="input" /></Field>
              <Field label="Level">
                <select value={draft.level} onChange={(e) => set("level", e.target.value)} className="input">
                  <option value="">Select Level</option>
                  <option>100L</option><option>200L</option><option>300L</option><option>400L</option><option>500L</option><option>600L</option>
                </select>
              </Field>
              <Field label="GPA"><input value={draft.gpa} onChange={(e) => set("gpa", e.target.value)} placeholder="e.g. 4.2" className="input" /></Field>
              <Field label="Course / Department">
                <select value={draft.course} onChange={(e) => set("course", e.target.value)} className="input">
                  <option value="">Select your course</option>
                  {LCU_COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
          )}

          {tab === "skills" && (
            <div className="p-6">
              <div className="text-sm font-semibold">Your Skills</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {draft.skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-full bg-pink-soft text-primary px-3 py-1 text-xs">
                    {s}
                    <button onClick={() => set("skills", draft.skills.filter((x) => x !== s))}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill (e.g. Python)" className="input flex-1" />
                <button onClick={() => { if (newSkill && !draft.skills.includes(newSkill)) { set("skills", [...draft.skills, newSkill]); setNewSkill(""); } }}
                  className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Add</button>
              </div>
              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Suggested</div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.filter((s) => !draft.skills.includes(s)).map((s) => (
                    <button key={s} onClick={() => set("skills", [...draft.skills, s])}
                      className="rounded-full border border-border px-3 py-1 text-xs hover:bg-secondary">+ {s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "preferences" && (
            <div className="p-6 text-sm text-muted-foreground">
              Set preferred work type, max commute distance, and stipend expectations from the Internships page filters.
            </div>
          )}
        </div>
      </section>

      <style>{`.input{width:100%;border:1px solid var(--input);border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;background:var(--card);outline:none}.input:focus{box-shadow:0 0 0 2px var(--ring)}`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
function Row({ icon, value }: { icon: React.ReactNode; value: string }) {
  return <div className="flex items-center gap-2 text-muted-foreground">{icon}<span>{value}</span></div>;
}
