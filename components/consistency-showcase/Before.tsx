"use client";
// Illustrative baseline for the case study – not a real product or client screen.
// Built from the same fictional data as the After version, with the kind of
// inconsistencies that accumulate when screens are designed and built separately.
import "./legacy.css";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { legacy, type StatusId } from "@/lib/consistency/tokens";
import { dashboardStats, formatShortDate, trainings, type Training } from "@/lib/consistency/data";
import { legacyStatusNames } from "@/lib/consistency/audit";
import { Marker } from "./Marker";

const vars = Object.fromEntries(Object.entries(legacy).map(([k, v]) => [`--lg-${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}`, v])) as React.CSSProperties;

/** Legacy styles without the app chrome – used to show individual legacy patterns. */
export function LegacyScope({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`lg-root ${className ?? ""}`} style={vars}>{children}</div>;
}

export function LegacyRoot({ active, children }: { active: "dashboard" | "list" | "form"; children: React.ReactNode }) {
  return (
    <div className="lg-root" style={vars}>
      <div className="lg-topbar">
        <b style={{ fontSize: 15 }}>Kursion</b>
        <a href="#" onClick={(e) => e.preventDefault()} data-on={active === "dashboard" || undefined}>Dashboard</a>
        <a href="#" onClick={(e) => e.preventDefault()} data-on={active === "list" || undefined}>Courses</a>
        <a href="#" onClick={(e) => e.preventDefault()} data-on={active === "form" || undefined}>Sign-ups</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Events</a>
        <Marker n={1} />
      </div>
      {children}
    </div>
  );
}

function DashStatus({ s }: { s: StatusId }) {
  const label = legacyStatusNames.dashboard[s];
  const cls = { draft: "lg-st-grey", published: "lg-st-pill-blue", open: "lg-st-orange", completed: "lg-st-green", cancelled: "lg-st-red" }[s];
  return <span className={cls}>{label}</span>;
}

/* ------------------------------------------------------------------ dashboard */

export function BeforeDashboard() {
  const st = dashboardStats();
  const upcoming = st.upcoming.slice(0, 5);
  return (
    <LegacyRoot active="dashboard">
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div className="lg-title">Trainings overview</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="lg-btn-grey">Export</button>
            <button className="lg-btn-outline">+ New event</button>
            <Marker n={2} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 14 }}>
          <div className="lg-box" style={{ padding: 12 }}><div style={{ fontSize: 12, color: legacy.muted }}>Upcoming</div><div style={{ fontSize: 26, fontWeight: "bold" }}>{st.upcoming.length}</div></div>
          <div className="lg-box" style={{ padding: "20px 16px", borderTop: `3px solid ${legacy.blue}` }}><div style={{ fontSize: 30, color: legacy.blue }}>{st.open.length}</div><div style={{ fontSize: 13 }}>open courses</div></div>
          <div className="lg-box" style={{ padding: 8, background: "#eef6ee" }}><span style={{ fontSize: 11, textTransform: "uppercase", color: legacy.green }}>Participants</span><br /><b style={{ fontSize: 20 }}>{st.participants}</b> <Marker n={3} /></div>
          <div className="lg-box" style={{ padding: "16px 24px" }}><div style={{ fontSize: 16, fontWeight: "bold" }}>Certificates</div><div style={{ fontSize: 13, color: legacy.muted }}>{st.certificates} pending</div></div>
        </div>
        <div className="lg-warn" style={{ marginTop: 12 }}>Note: {st.atRisk.length} courses have low registrations.</div>
        <div className="lg-box" style={{ marginTop: 12, padding: "10px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: "bold" }}>Next events</div>
            <button className="lg-btn-blue">View all</button>
          </div>
          <table style={{ width: "100%", marginTop: 6, fontSize: 13, borderCollapse: "collapse" }}>
            <tbody>
              {upcoming.map((t, i) => (
                <tr key={t.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: "7px 0" }}>{t.title}</td>
                  <td style={{ color: legacy.muted, whiteSpace: "nowrap" }}>{formatShortDate(t.start)}</td>
                  <td style={{ textAlign: "right" }}><DashStatus s={t.status} />{i === 0 && <Marker n={4} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LegacyRoot>
  );
}

/* ------------------------------------------------------------------ form */

export function BeforeForm() {
  const [v, setV] = useState({ training: "", first: "", last: "", email: "", phone: "", company: "", terms: false });
  const [error, setError] = useState(false);
  const [bad, setBad] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const emailBad = v.email.length > 0 && !/^\S+@\S+\.\S+$/.test(v.email); // validates on every keystroke
  const set = (k: string, val: string | boolean) => { setV((o) => ({ ...o, [k]: val })); setSaved(false); };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing = ["training", "first", "last", "email"].filter((k) => !v[k as keyof typeof v]);
    if (!v.terms) missing.push("terms");
    setBad(missing.filter((k) => k !== "terms" && k !== "last")); // only some fields get highlighted
    setError(missing.length > 0 || emailBad);
    setSaved(missing.length === 0 && !emailBad);
  }

  return (
    <LegacyRoot active="form">
      <form onSubmit={submit} noValidate style={{ padding: 20, maxWidth: 560 }}>
        <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>New sign-up</div>
        {error && <div className="lg-banner-error" style={{ marginBottom: 12 }}>Error! Please check the form. <Marker n={4} /></div>}
        <label style={{ fontSize: 12, fontWeight: "bold", display: "block", marginBottom: 4 }}>Course *</label>
        <select className={`lg-input-box ${bad.includes("training") ? "lg-invalid" : ""}`} value={v.training} onChange={(e) => set("training", e.target.value)}>
          <option value="">-- select --</option>
          {trainings.filter((t) => t.status === "open").map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <input aria-label="First name" className={`lg-input-ph ${bad.includes("first") ? "lg-invalid" : ""}`} style={{ flex: "1 1 160px" }} placeholder="First name *" value={v.first} onChange={(e) => set("first", e.target.value)} />
          <input aria-label="Last name" className="lg-input-ph" style={{ flex: "1 1 160px" }} placeholder="Last name" value={v.last} onChange={(e) => set("last", e.target.value)} />
          <Marker n={1} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <span style={{ fontSize: 13, width: 60 }}>E-mail:</span>
          <input aria-label="E-mail" className={`lg-input-line ${emailBad || bad.includes("email") ? "lg-invalid" : ""}`} value={v.email} onChange={(e) => set("email", e.target.value)} />
          <Marker n={2} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 160px" }}>
            <label style={{ fontSize: 12, display: "block", marginBottom: 2 }}>Phone</label>
            <input className="lg-input-box" style={{ borderRadius: 0 }} value={v.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <label style={{ fontSize: 12, display: "block", marginBottom: 2, color: legacy.muted }}>Company (for invoice)</label>
            <input className="lg-input-box" value={v.company} onChange={(e) => set("company", e.target.value)} />
          </div>
        </div>
        <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, marginTop: 14, color: legacy.muted }}>
          <input type="checkbox" checked={v.terms} onChange={(e) => set("terms", e.target.checked)} /> I accept the terms <Marker n={3} />
        </label>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 18 }}>
          <button type="submit" className="lg-btn-save">Save</button>
          <Marker n={5} />
          <a href="#" onClick={(e) => { e.preventDefault(); setV({ training: "", first: "", last: "", email: "", phone: "", company: "", terms: false }); setError(false); setBad([]); }} style={{ color: legacy.muted, fontSize: 13 }}>cancel</a>
          {saved && <span style={{ color: legacy.green, fontSize: 12 }}>Data saved</span>}
        </div>
      </form>
    </LegacyRoot>
  );
}

/* ------------------------------------------------------------------ list */

const listStatus: Record<StatusId, React.CSSProperties> = {
  draft: { background: "#aaa" },
  published: { background: "transparent", color: legacy.blue, textTransform: "none", fontSize: 12, padding: 0 },
  open: { background: legacy.green },
  completed: { background: "transparent", color: legacy.text, textTransform: "none", fontSize: 12, padding: 0 },
  cancelled: { background: legacy.red },
};

export function BeforeList() {
  const [rows, setRows] = useState<Training[]>(trainings);
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState(""); // search only runs after "Go"
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  let list = rows.filter((t) => t.title.toLowerCase().includes(applied.toLowerCase()) && (status === "all" || t.status === status));
  list = [...list].sort((a, b) => (sortBy === "name" ? a.title.localeCompare(b.title) : sortBy === "places" ? b.registered - a.registered : a.start.localeCompare(b.start)));

  return (
    <LegacyRoot active="list">
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 20, fontWeight: "bold" }}>Trainings</div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input aria-label="Search" className="lg-input-box" style={{ width: 180, height: 30, borderRadius: 0 }} placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="lg-btn-go" onClick={() => setApplied(query)}>Go</button>
          <Marker n={1} />
          <select aria-label="Status" className="lg-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="open">Active</option>
            <option value="published">Live</option>
            <option value="draft">Not published</option>
            <option value="completed">Done</option>
            <option value="cancelled">Canceled</option>
          </select>
          <Marker n={2} />
          <span style={{ fontSize: 12, marginLeft: 8 }}>Sort by</span>
          <select aria-label="Sort by" className="lg-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="places">Places</option>
          </select>
          <Marker n={3} />
        </div>
        <div style={{ overflowX: "auto", marginTop: 10 }}>
          <table className="lg-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Date</th><th>Trainer</th><th>Places</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {list.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: legacy.muted }}>{t.id}</td>
                  <td>{t.title}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{formatShortDate(t.start)}.{t.start.slice(0, 4)}</td>
                  <td>{t.lecturer}</td>
                  <td>{t.registered}/{t.seats}</td>
                  <td><span className="lg-pill" style={listStatus[t.status]}>{legacyStatusNames.list[t.status]}</span></td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ color: legacy.blue, fontSize: 12, marginRight: 8 }}>Edit</a>
                    <button className="lg-btn-icon"><Eye size={15} /></button>
                    <button className="lg-btn-delete" onClick={() => setRows((r) => r.filter((x) => x.id !== t.id))}>Delete</button>
                    {i === 0 && <Marker n={4} />}
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={7} style={{ color: legacy.muted }}>No data</td></tr>}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="lg-link-add">+ Add training</button>
          <Marker n={5} />
          {rows.length < trainings.length && (
            <button className="lg-link-add" style={{ marginLeft: 14 }} onClick={() => setRows(trainings)}>(reset demo)</button>
          )}
        </div>
      </div>
    </LegacyRoot>
  );
}
