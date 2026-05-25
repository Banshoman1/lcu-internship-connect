import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useApplications } from "@/lib/profile-store";
import { INTERNSHIPS } from "@/lib/internship-data";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "My Applications — Smart Internship System" }] }),
  component: ApplicationsPage,
});

const STATUSES = ["Total", "Pending", "Reviewing", "Interview", "Accepted"] as const;

function ApplicationsPage() {
  const { applications } = useApplications();
  const [filter, setFilter] = useState<typeof STATUSES[number]>("Total");

  const counts: Record<string, number> = { Total: applications.length };
  for (const s of ["Pending","Reviewing","Interview","Accepted"]) {
    counts[s] = applications.filter((a) => a.status === s).length;
  }
  const visible = filter === "Total" ? applications : applications.filter((a) => a.status === filter);

  return (
    <>
      <PageHero title="My Applications" subtitle="Track the status of all your internship applications" />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-xl border p-5 text-center ${filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>
              <div className="text-2xl font-bold">{counts[s]}</div>
              <div className="text-xs opacity-80">{s}</div>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card">
          {visible.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto opacity-40" />
              <p className="mt-3">No applications found.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-5 py-3">Company</th><th>Position</th><th>Course</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => {
                  const i = INTERNSHIPS.find((x) => x.id === a.internshipId);
                  if (!i) return null;
                  return (
                    <tr key={a.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium">{i.company}</td>
                      <td>{i.title}</td>
                      <td>{i.course}</td>
                      <td>{new Date(a.date).toLocaleDateString()}</td>
                      <td><StatusBadge status={a.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-secondary text-secondary-foreground",
    Reviewing: "bg-pink-soft text-pink",
    Interview: "bg-primary/10 text-primary",
    Accepted: "bg-success/15 text-success",
    Rejected: "bg-destructive/10 text-destructive",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${map[status] ?? "bg-secondary"}`}>{status}</span>;
}
