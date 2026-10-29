// Fictional data for the "Kursion" training management platform.
// All names, trainings and numbers are invented for the case study.
// Both the Before and the After interfaces read from this file, so the
// comparison is always made on identical content.

import type { StatusId } from "./tokens";

export type Training = {
  id: string;
  title: string;
  category: "Management" | "Digital skills" | "Communication" | "Compliance" | "Finance";
  format: "Online" | "Classroom" | "Hybrid";
  start: string; // ISO date
  lecturer: string;
  seats: number;
  registered: number;
  status: StatusId;
  price: number;
};

export const TODAY = "2026-11-02"; // fixed, so server and client render the same output

export const trainings: Training[] = [
  { id: "T-1042", title: "Project Management Fundamentals", category: "Management", format: "Classroom", start: "2026-11-12", lecturer: "Kai Rebane", seats: 16, registered: 14, status: "open", price: 590 },
  { id: "T-1043", title: "Excel for Financial Analysis", category: "Finance", format: "Online", start: "2026-11-18", lecturer: "Mattias Ilves", seats: 20, registered: 20, status: "open", price: 340 },
  { id: "T-1044", title: "Agile Product Ownership", category: "Management", format: "Hybrid", start: "2026-11-25", lecturer: "Grete Sild", seats: 14, registered: 5, status: "open", price: 720 },
  { id: "T-1045", title: "Effective Presentation Skills", category: "Communication", format: "Classroom", start: "2026-12-03", lecturer: "Oliver Mänd", seats: 12, registered: 0, status: "published", price: 410 },
  { id: "T-1046", title: "Data Protection Essentials", category: "Compliance", format: "Online", start: "2026-12-08", lecturer: "Hanna Kuusk", seats: 40, registered: 0, status: "draft", price: 190 },
  { id: "T-1047", title: "Leadership for New Managers", category: "Management", format: "Classroom", start: "2026-12-10", lecturer: "Kai Rebane", seats: 12, registered: 3, status: "open", price: 860 },
  { id: "T-1048", title: "Customer Service Excellence", category: "Communication", format: "Hybrid", start: "2026-10-14", lecturer: "Oliver Mänd", seats: 18, registered: 17, status: "completed", price: 380 },
  { id: "T-1049", title: "Introduction to Python", category: "Digital skills", format: "Online", start: "2026-10-21", lecturer: "Mattias Ilves", seats: 24, registered: 22, status: "completed", price: 520 },
  { id: "T-1050", title: "Negotiation Skills", category: "Communication", format: "Classroom", start: "2026-11-06", lecturer: "Grete Sild", seats: 12, registered: 4, status: "cancelled", price: 450 },
  { id: "T-1051", title: "UX Design Basics", category: "Digital skills", format: "Hybrid", start: "2027-01-14", lecturer: "Liisa Org", seats: 16, registered: 0, status: "published", price: 640 },
  { id: "T-1052", title: "Accounting for Non-Accountants", category: "Finance", format: "Online", start: "2027-01-20", lecturer: "Hanna Kuusk", seats: 30, registered: 0, status: "draft", price: 290 },
  { id: "T-1053", title: "Time Management", category: "Communication", format: "Online", start: "2027-02-04", lecturer: "Liisa Org", seats: 30, registered: 9, status: "open", price: 160 },
];

export const roles = [
  { id: "sales", label: "Sales representative", task: "Answers client questions and books groups" },
  { id: "manager", label: "Training manager", task: "Plans the schedule and monitors registrations" },
  { id: "creator", label: "Content creator", task: "Prepares training descriptions and materials" },
  { id: "lecturer", label: "Lecturer", task: "Runs sessions and records attendance" },
  { id: "admin", label: "Administrator", task: "Manages users, settings and certificates" },
];

/** Minimum group size before a training is at risk. */
export const MIN_PARTICIPANTS = 6;

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${y}`;
};
export const formatShortDate = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}`;
};

export function dashboardStats(list: Training[] = trainings) {
  const upcoming = list.filter((t) => t.start >= TODAY && t.status !== "cancelled" && t.status !== "completed");
  const open = list.filter((t) => t.status === "open");
  const atRisk = open.filter((t) => t.registered < MIN_PARTICIPANTS);
  const full = open.filter((t) => t.registered >= t.seats);
  const certificates = list.filter((t) => t.status === "completed").reduce((n, t) => n + t.registered, 0);
  const participants = upcoming.reduce((n, t) => n + t.registered, 0);
  return { upcoming, open, atRisk, full, certificates, participants };
}
