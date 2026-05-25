import { Link, useRouterState } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Top navigation that matches the LCU reference: round logo + nav pills + bell + avatar.
const NAV = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Map & Location" },
  { to: "/internships", label: "Internships" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/applications", label: "Applications" },
  { to: "/profile", label: "Profile" },
] as const;

const NOTIFICATIONS = [
  { title: "Interview Scheduled!", body: "Andela Nigeria — April 10, 2026", ago: "2h ago", dot: "var(--success)" },
  { title: "New Internship Match", body: "Paystack — 94% skill match", ago: "5h ago", dot: "var(--primary)" },
  { title: "Application Reviewed", body: "MTN Nigeria is reviewing your application", ago: "1d ago", dot: "var(--pink)" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">LCU</div>
          <div className="leading-tight">
            <div className="font-semibold text-foreground">Smart Internship System</div>
            <div className="text-xs text-pink">Lead City University</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-pink" />
          </button>
          {open && (
            <div className="absolute right-6 top-16 w-80 rounded-lg border border-border bg-card shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-semibold">Notifications</span>
                <button className="text-sm text-pink font-medium">Mark all read</button>
              </div>
              <ul>
                {NOTIFICATIONS.map((n) => (
                  <li key={n.title} className="flex gap-3 px-4 py-3 border-b border-border last:border-0">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: n.dot }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.body}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{n.ago}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 text-center">
                <Link to="/dashboard" className="text-sm text-primary font-medium">View all notifications</Link>
              </div>
            </div>
          )}
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">AO</div>
        </div>
      </div>
    </header>
  );
}
