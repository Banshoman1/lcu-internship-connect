// Tiny localStorage-backed store for student profile + applications.
// Replaceable with Lovable Cloud later without touching the UI.
import { useEffect, useState } from "react";

export interface StudentProfile {
  firstName: string;
  lastName: string;
  matric: string;
  email: string;
  phone: string;
  level: string;
  gpa: string;
  course: string;
  skills: string[];
}

export const DEFAULT_PROFILE: StudentProfile = {
  firstName: "Asake",
  lastName: "OLAOLUWA Ayomide",
  matric: "LCU/UG/22/21894",
  email: "",
  phone: "",
  level: "",
  gpa: "",
  course: "Software Engineering",
  skills: ["JavaScript", "React", "Python"],
};

const PROFILE_KEY = "lcu_profile";
const APPS_KEY = "lcu_applications";
const SAVED_KEY = "lcu_saved";

export type AppStatus = "Pending" | "Reviewing" | "Interview" | "Accepted" | "Rejected";
export interface Application { id: string; internshipId: string; status: AppStatus; date: string; }

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("lcu-storage"));
}

export function useProfile() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  useEffect(() => { setProfile(read(PROFILE_KEY, DEFAULT_PROFILE)); }, []);
  const save = (p: StudentProfile) => { setProfile(p); write(PROFILE_KEY, p); };
  return { profile, save };
}

export function useApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  useEffect(() => {
    const sync = () => setApps(read<Application[]>(APPS_KEY, []));
    sync();
    window.addEventListener("lcu-storage", sync);
    return () => window.removeEventListener("lcu-storage", sync);
  }, []);
  const apply = (internshipId: string) => {
    const next = [...apps, { id: crypto.randomUUID(), internshipId, status: "Pending" as AppStatus, date: new Date().toISOString() }];
    write(APPS_KEY, next);
  };
  return { applications: apps, apply };
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSaved(read<string[]>(SAVED_KEY, []));
    sync();
    window.addEventListener("lcu-storage", sync);
    return () => window.removeEventListener("lcu-storage", sync);
  }, []);
  const toggle = (id: string) => {
    const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
    write(SAVED_KEY, next);
  };
  return { saved, toggle };
}

// Compute a 0..100 profile-completion score for the dashboard widget.
export function profileCompletion(p: StudentProfile): number {
  const fields = [p.firstName, p.lastName, p.matric, p.email, p.phone, p.level, p.gpa, p.course];
  const filled = fields.filter(Boolean).length;
  const skillBonus = Math.min(p.skills.length, 5) * 4;
  return Math.min(100, Math.round((filled / fields.length) * 80 + skillBonus));
}
