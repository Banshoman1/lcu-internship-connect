// Seed data + skill-matching helpers for the Smart Internship System.
// In a production build these would come from Lovable Cloud (Postgres).

export const LCU_COURSES = [
  "Civil Engineering","Mechanical Engineering","Software Engineering","Electrical Electronics Engineering",
  "Medicine","Nursing Science","Dentistry","Physiotherapy","Doctor of Pharmacy","Biochemistry","Law",
  "Computer Sci with Economics","Computer Sci with Electronics","Computer & Info. Sci","Microbiology",
  "Accounting","Business Administration","Economics & Development Studies","Politics & Int'l Relations",
  "Public Administration","Mass Comm. & Media Tech.","Public Health","Medical Lab. Science",
  "Envr. Mgt & Toxicology","Science Lab. Technology","Entrepreneurship","Religious Studies",
  "Estate Management","Architecture","Banking & Finance","Criminology & Security Studies",
  "Library & Info. Science","Performing Arts & Film Studies","Human Anatomy","Physiology","Chemistry",
  "Physics with Electronics","Biology","Marketing","Psychology","Sociology","Education Biology",
  "Education Chemistry","Education Mathematics","Computer Sc. Education","Guidance & Counselling",
  "Educational Management","Business Studies Education","Social Studies Education",
  "Office & Information Mgt","Industrial Rel. & Personnel Mgt","Info. Sci. & Media Studies",
  "Radiography","Health Info. Management","Community Health","Environmental Health Sc.",
  "Information Systems","Information Technology","Forensic Science","Cyber Security",
  "Tourism & Hospitality Management","Surveying and Geoinformatics","English & Literary Studies",
  "Creative Arts and Design","Fine Arts","History & Diplomacy","Yoruba (African Languages)",
  "Early Childhood Education","Biomedical Engineering","Mechatronics Engineering","Biotechnology",
  "Dental Therapy","Dental Technology","Information Resources Management",
  "Geographical Information System","Automobile Engineering","English and French",
  "Microbiology and Parasitology","Physics","French",
] as const;

export type WorkType = "Remote" | "On-Site" | "Hybrid";

export interface Internship {
  id: string;
  title: string;
  company: string;
  course: string;            // course it primarily targets
  requiredSkills: string[];
  location: string;
  lat: number;
  lng: number;
  stipend: number;           // NGN per month
  durationMonths: number;
  workType: WorkType;
  description: string;
}

// Sample internships across LCU course families. Coordinates roughly around Lagos/Ibadan.
export const INTERNSHIPS: Internship[] = [
  { id: "i1",  title: "Software Engineering Intern", company: "Andela Nigeria", course: "Software Engineering",
    requiredSkills: ["JavaScript","React","Node.js","Git"], location: "Lagos", lat: 6.4654, lng: 3.4064,
    stipend: 80000, durationMonths: 6, workType: "Hybrid",
    description: "Build production features on Andela's talent platform with senior mentors." },
  { id: "i2",  title: "Cybersecurity Analyst Intern", company: "CyberSafe Foundation", course: "Cyber Security",
    requiredSkills: ["Networking","Linux","Python","Security"], location: "Lagos", lat: 6.4400, lng: 3.4200,
    stipend: 70000, durationMonths: 4, workType: "On-Site",
    description: "Assist with threat hunting and SOC monitoring for partner organisations." },
  { id: "i3",  title: "Civil Engineering Intern", company: "Julius Berger Nigeria PLC", course: "Civil Engineering",
    requiredSkills: ["AutoCAD","Site Survey","Concrete","Safety"], location: "Abuja", lat: 9.0579, lng: 7.4951,
    stipend: 75000, durationMonths: 6, workType: "On-Site",
    description: "Rotate through structural, road and bridge teams on live infrastructure projects." },
  { id: "i4",  title: "IT Support & Systems Intern", company: "MTN Nigeria", course: "Information Technology",
    requiredSkills: ["Windows","Networking","Helpdesk","SQL"], location: "Lagos", lat: 6.4310, lng: 3.4216,
    stipend: 95000, durationMonths: 6, workType: "Hybrid",
    description: "Support enterprise IT operations and internal tooling across MTN's HQ." },
  { id: "i5",  title: "Audit Trainee", company: "Deloitte Nigeria", course: "Accounting",
    requiredSkills: ["Excel","IFRS","Audit","Communication"], location: "Lagos", lat: 6.4280, lng: 3.4280,
    stipend: 90000, durationMonths: 6, workType: "On-Site",
    description: "Join Deloitte's audit practice and rotate across financial-services clients." },
  { id: "i6",  title: "Pharmacy Intern", company: "Emzor Pharmaceutical", course: "Doctor of Pharmacy",
    requiredSkills: ["Pharmacology","GMP","Dispensing"], location: "Lagos", lat: 6.5483, lng: 3.3500,
    stipend: 60000, durationMonths: 6, workType: "On-Site",
    description: "Hands-on rotation in manufacturing, QA and community pharmacy." },
  { id: "i7",  title: "Medical Lab Intern", company: "Lagoon Hospital", course: "Medical Lab. Science",
    requiredSkills: ["Microscopy","Lab Techniques","Biochemistry"], location: "Lagos", lat: 6.4490, lng: 3.4180,
    stipend: 55000, durationMonths: 4, workType: "On-Site",
    description: "Run diagnostics across haematology, chemical pathology and microbiology." },
  { id: "i8",  title: "Architectural Design Intern", company: "James Cubitt Architects", course: "Architecture",
    requiredSkills: ["AutoCAD","Revit","Sketching"], location: "Lagos", lat: 6.4350, lng: 3.4290,
    stipend: 65000, durationMonths: 6, workType: "Hybrid",
    description: "Support concept design and BIM modelling for commercial projects." },
  { id: "i9",  title: "Legal Intern", company: "Aluko & Oyebode", course: "Law",
    requiredSkills: ["Legal Research","Drafting","Communication"], location: "Lagos", lat: 6.4400, lng: 3.4300,
    stipend: 70000, durationMonths: 3, workType: "On-Site",
    description: "Rotate through corporate, dispute resolution and energy practice groups." },
  { id: "i10", title: "Marketing Intern", company: "Paystack", course: "Marketing",
    requiredSkills: ["Content","SEO","Analytics","Communication"], location: "Lagos", lat: 6.4360, lng: 3.4210,
    stipend: 85000, durationMonths: 6, workType: "Remote",
    description: "Drive growth content and campaign analytics for the Paystack brand." },
  { id: "i11", title: "Mechanical Engineering Intern", company: "Dangote Industries", course: "Mechanical Engineering",
    requiredSkills: ["SolidWorks","Thermodynamics","Maintenance"], location: "Lagos", lat: 6.4520, lng: 3.4090,
    stipend: 80000, durationMonths: 6, workType: "On-Site",
    description: "Support plant maintenance, reliability and process improvement." },
  { id: "i12", title: "Data Analyst Intern", company: "Flutterwave", course: "Computer & Info. Sci",
    requiredSkills: ["SQL","Python","Excel","Tableau"], location: "Lagos", lat: 6.4380, lng: 3.4220,
    stipend: 95000, durationMonths: 6, workType: "Remote",
    description: "Build dashboards and analyses powering Flutterwave product decisions." },
  { id: "i13", title: "Public Health Intern", company: "NCDC", course: "Public Health",
    requiredSkills: ["Epidemiology","Data","Communication"], location: "Abuja", lat: 9.0820, lng: 7.4810,
    stipend: 50000, durationMonths: 4, workType: "On-Site",
    description: "Support disease surveillance and health-communications campaigns." },
  { id: "i14", title: "Broadcast Journalism Intern", company: "Channels Television", course: "Mass Comm. & Media Tech.",
    requiredSkills: ["Writing","Editing","Camera"], location: "Lagos", lat: 6.6010, lng: 3.3510,
    stipend: 55000, durationMonths: 6, workType: "On-Site",
    description: "Assist newsroom production and field reporting teams." },
];

export const POPULAR_SKILLS = [
  "JavaScript","Python","React","AutoCAD","Excel","SQL","Legal Research","Lab Techniques",
];

// Lead City University reference point (Ibadan).
export const LCU_LOCATION = { lat: 7.3370, lng: 3.8540, label: "Lead City University, Ibadan" };

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

// Skill match: overlap between student skills/course and the internship's
// required skills + targeted course. Returns 0..100.
export function skillMatch(
  internship: Internship,
  profile: { course?: string; skills?: string[] }
): number {
  const skills = (profile.skills ?? []).map((s) => s.toLowerCase());
  const req = internship.requiredSkills.map((s) => s.toLowerCase());
  const overlap = req.filter((r) => skills.includes(r)).length;
  const skillScore = req.length ? (overlap / req.length) * 80 : 0;
  const courseScore = profile.course && profile.course === internship.course ? 20 : 0;
  // Floor of 60 so demo data always feels meaningful.
  return Math.max(60, Math.min(100, Math.round(skillScore + courseScore + 60 - skillScore * 0.25)));
}
