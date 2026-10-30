"use client";
// The same three screens rebuilt with Kursion UI. Same data, same functionality.
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Download, LayoutDashboard, Plus, ScrollText, UserPlus, Users } from "lucide-react";
import clsx from "clsx";
import { Alert, Button, Card, Checkbox, DataTable, FilterChips, Input, KursionRoot, Modal, SearchField, Select, StatusBadge, sortRows, type Column, type Sort } from "@/components/kursion";
import { statuses, type StatusId } from "@/lib/consistency/tokens";
import { MIN_PARTICIPANTS, dashboardStats, formatDate, trainings, type Training } from "@/lib/consistency/data";
import { Marker } from "./Marker";
import "./after.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "list", label: "Trainings", icon: BookOpen },
  { id: "form", label: "Registrations", icon: UserPlus },
  { id: "participants", label: "Participants", icon: Users },
  { id: "certificates", label: "Certificates", icon: ScrollText },
] as const;

/** App shell: one navigation, one vocabulary. Navigation collapses to a top bar in narrow containers. */
export function AppShell({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <KursionRoot className="cc-shell">
      <div className="cc-layout">
        <nav aria-label="Kursion" className="cc-nav">
          <p className="cc-brand">Kursion</p>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-current={n.id === active ? "page" : undefined}
                  className={clsx("flex items-center gap-2 whitespace-nowrap rounded-[var(--k-radius-control)] px-2.5 py-1.5 text-[13px] font-semibold", n.id === active ? "bg-[var(--k-color-bg-selected)] text-[var(--k-color-action-primary)]" : "text-[var(--k-color-text-secondary)] hover:bg-[var(--k-color-bg-subtle)]")}
                >
                  <n.icon className="h-4 w-4" aria-hidden />
                  {n.label}
                  {n.id === "list" && <Marker n={1} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="cc-main">{children}</div>
      </div>
    </KursionRoot>
  );
}

function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="k-h1">{title}</h2>
        {description && <p className="k-muted k-small" style={{ margin: "4px 0 0" }}>{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ dashboard */

export function AfterDashboard() {
  const st = dashboardStats();
  const kpis = [
    { label: "Upcoming trainings", value: st.upcoming.length, note: "Next 3 months" },
    { label: "Open for registration", value: st.open.length, note: `${st.full.length} fully booked` },
    { label: "Registered participants", value: st.participants, note: "Upcoming trainings" },
    { label: "Certificates to issue", value: st.certificates, note: "Completed trainings" },
  ];
  return (
    <AppShell active="dashboard">
      <PageHeader title="Dashboard" description="Monday, 2 November 2026">
        <Button variant="secondary" icon={Download}>Export</Button>
        <Button icon={Plus}>New training</Button>
        <Marker n={2} />
      </PageHeader>
      <div className="cc-kpis">
        {kpis.map((k, i) => (
          <Card key={k.label} padding="sm" as="div">
            <p className="k-small k-muted" style={{ margin: 0 }}>{k.label}{i === 0 && <Marker n={3} />}</p>
            <p style={{ margin: 0, fontSize: "var(--k-font-size-display)", fontWeight: 700, lineHeight: 1.1 }}>{k.value}</p>
            <p className="k-small k-muted" style={{ margin: 0 }}>{k.note}</p>
          </Card>
        ))}
      </div>
      {st.atRisk.length > 0 && (
        <div className="mt-4 flex items-start">
          <div className="min-w-0 flex-1">
            <Alert tone="warning" title={`${st.atRisk.length} trainings are below the minimum of ${MIN_PARTICIPANTS} participants`}>
              <ul>{st.atRisk.map((t) => <li key={t.id}><a href="#" onClick={(e) => e.preventDefault()}>{t.title}</a> – {t.registered} registered, starts {formatDate(t.start)}</li>)}</ul>
            </Alert>
          </div>
          <Marker n={5} className="mt-3" />
        </div>
      )}
      <div className="mt-4">
        <Card title="Upcoming trainings" headingLevel={3} actions={<Button variant="secondary" size="sm">View all trainings</Button>}>
          <ul className="grid">
            {st.upcoming.slice(0, 5).map((t, i) => (
              <li key={t.id} className="cc-row border-t border-[var(--k-color-border-default)] py-2.5 first:border-t-0 first:pt-0">
                <span className="min-w-0 font-semibold">{t.title}</span>
                <span className="k-small k-muted cc-date">{formatDate(t.start)}</span>
                <span className="k-small k-muted cc-seats">{t.registered}/{t.seats} seats</span>
                <span className="justify-self-end"><StatusBadge status={t.status} />{i === 0 && <Marker n={4} />}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

/* ------------------------------------------------------------------ registration form */

type FormValues = { training: string; first: string; last: string; email: string; phone: string; company: string; terms: boolean };
const EMPTY: FormValues = { training: "", first: "", last: "", email: "", phone: "", company: "", terms: false };
const LABELS: Record<keyof FormValues, string> = { training: "Training", first: "First name", last: "Last name", email: "Email", phone: "Phone", company: "Company", terms: "Terms" };

function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {};
  if (!v.training) e.training = "Choose a training.";
  if (!v.first.trim()) e.first = "Enter the participant’s first name.";
  if (!v.last.trim()) e.last = "Enter the participant’s last name.";
  if (!v.email.trim()) e.email = "Enter an email address.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter an email address in the format name@company.com.";
  if (!v.terms) e.terms = "Confirm that the participant accepts the training terms.";
  return e;
}

export function AfterForm() {
  const [v, setV] = useState<FormValues>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<"idle" | "error" | "saving" | "done">("idle");
  const [attempt, setAttempt] = useState(0);
  const summary = useRef<HTMLDivElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  const refs = useRef<Partial<Record<keyof FormValues, HTMLElement | null>>>({});
  const errors = submitted ? validate(v) : {};
  const list = Object.entries(errors) as [keyof FormValues, string][];
  const open = trainings.filter((t) => t.status === "open" && t.registered < t.seats);

  useEffect(() => {
    if (state === "error") summary.current?.focus();
    if (state === "done") confirmation.current?.focus(); // the submit button is gone, so focus the result
  }, [state, attempt]);

  const set = <K extends keyof FormValues>(k: K, val: FormValues[K]) => setV((o) => ({ ...o, [k]: val }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setAttempt((a) => a + 1);
    if (Object.keys(validate(v)).length) return setState("error");
    setState("saving");
    setTimeout(() => setState("done"), 900); // simulated request – nothing is sent
  }

  const chosen = trainings.find((t) => t.id === v.training);

  return (
    <AppShell active="form">
      <PageHeader title="Register a participant" description="All fields are required unless marked optional." />
      {state === "done" && chosen ? (
        <Card title="Registration confirmed" headingLevel={3}>
          <Alert tone="success" title={`${v.first} ${v.last} is registered`} focusRef={confirmation}>
            <p>{chosen.title} · {formatDate(chosen.start)} · confirmation sent to {v.email}. (Demo – nothing was sent.)</p>
          </Alert>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => { setV(EMPTY); setSubmitted(false); setState("idle"); }} icon={UserPlus}>Register another participant</Button>
            <Button variant="secondary">View registrations</Button>
          </div>
          <Marker n={5} />
        </Card>
      ) : (
        <Card>
          <form noValidate onSubmit={submit} className="grid gap-4" aria-label="Register a participant">
            {state === "error" && list.length > 0 && (
              <Alert tone="danger" title={`Fix ${list.length} ${list.length === 1 ? "field" : "fields"} to continue`} focusRef={summary}>
                <ul>
                  {list.map(([k, msg]) => (
                    <li key={k}><a href="#" onClick={(e) => { e.preventDefault(); refs.current[k]?.focus(); }}>{LABELS[k]}: {msg}</a></li>
                  ))}
                </ul>
              </Alert>
            )}
            <Select ref={(el) => { refs.current.training = el; }} name="training" label="Training" required placeholder="Choose a training" value={v.training} onChange={(x) => set("training", x)} error={errors.training} options={open.map((t) => ({ value: t.id, label: `${t.title} – ${formatDate(t.start)}` }))} hint="Only trainings with free seats are listed." />
            <div className="cc-2col">
              <Input ref={(el) => { refs.current.first = el; }} name="first" label="First name" required autoComplete="given-name" value={v.first} onChange={(x) => set("first", x)} error={errors.first} />
              <Input ref={(el) => { refs.current.last = el; }} name="last" label="Last name" required autoComplete="family-name" value={v.last} onChange={(x) => set("last", x)} error={errors.last} />
            </div>
            <div className="flex items-start">
              <div className="flex-1"><Input ref={(el) => { refs.current.email = el; }} name="email" type="email" label="Email" required autoComplete="email" hint="The confirmation and certificate are sent here." value={v.email} onChange={(x) => set("email", x)} error={errors.email} /></div>
              <Marker n={1} className="mt-7" />
            </div>
            <div className="cc-2col">
              <Input name="phone" type="tel" label="Phone" optional autoComplete="tel" value={v.phone} onChange={(x) => set("phone", x)} />
              <div className="flex items-start"><div className="flex-1"><Input name="company" label="Company" optional hint="Used for the invoice." value={v.company} onChange={(x) => set("company", x)} /></div><Marker n={2} className="mt-7" /></div>
            </div>
            <div className="flex items-start">
              <Checkbox ref={(el) => { refs.current.terms = el; }} name="terms" required label="The participant accepts the training terms and privacy notice." checked={v.terms} onChange={(x) => set("terms", x)} error={errors.terms} />
              <Marker n={3} />
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-[var(--k-color-border-default)] pt-4">
              <Button type="submit" loading={state === "saving"}>{state === "saving" ? "Registering…" : "Register participant"}</Button>
              <Button variant="secondary" onClick={() => { setV(EMPTY); setSubmitted(false); setState("idle"); }}>Clear form</Button>
              <Marker n={4} />
            </div>
          </form>
        </Card>
      )}
    </AppShell>
  );
}

/* ------------------------------------------------------------------ training list */

const STATUS_ORDER: StatusId[] = ["draft", "published", "open", "completed", "cancelled"];

export function AfterList() {
  const [rows, setRows] = useState<Training[]>(trainings);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusId | "all">("all");
  const [sort, setSort] = useState<Sort>({ key: "start", dir: "asc" });
  const [toCancel, setToCancel] = useState<Training | null>(null);
  const [notice, setNotice] = useState("");
  const noticeRef = useRef<HTMLDivElement>(null);
  // The row's Cancel button disappears after cancelling, so focus moves to the confirmation instead.
  useEffect(() => {
    if (notice) noticeRef.current?.focus();
  }, [notice]);

  const columns: Column<Training>[] = useMemo(
    () => [
      { key: "title", header: "Training", sortValue: (t) => t.title, cell: (t) => <><span className="block font-semibold">{t.title}</span><span className="k-muted" style={{ fontSize: "var(--k-font-size-caption)" }}>{t.id} · {t.format}</span></> },
      { key: "start", header: "Starts", sortValue: (t) => t.start, cell: (t) => <span className="whitespace-nowrap">{formatDate(t.start)}</span> },
      { key: "lecturer", header: "Lecturer", cell: (t) => t.lecturer },
      { key: "seats", header: "Seats", numeric: true, sortValue: (t) => t.registered / t.seats, cell: (t) => `${t.registered} / ${t.seats}` },
      { key: "status", header: "Status", sortValue: (t) => STATUS_ORDER.indexOf(t.status), cell: (t) => <StatusBadge status={t.status} /> },
      {
        key: "actions",
        header: "Actions",
        cell: (t) => (
          <span className="flex gap-1.5">
            <Button variant="secondary" size="sm" aria-label={`Edit ${t.title}`}>Edit</Button>
            {(t.status === "open" || t.status === "published") && <Button variant="destructive" size="sm" aria-label={`Cancel ${t.title}`} onClick={() => setToCancel(t)}>Cancel</Button>}
          </span>
        ),
      },
    ],
    [],
  );

  const filtered = rows.filter((t) => (status === "all" || t.status === status) && `${t.title} ${t.lecturer} ${t.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  const shown = sortRows(filtered, columns, sort);
  const count = (s: StatusId | "all") => rows.filter((t) => s === "all" || t.status === s).length;

  return (
    <AppShell active="list">
      <PageHeader title="Trainings" description={`${rows.length} trainings in the catalogue`}>
        <Button icon={Plus}>New training</Button>
        <Marker n={5} />
      </PageHeader>
      <div className="cc-toolbar">
        <div className="flex items-end"><div className="flex-1"><SearchField value={query} onChange={setQuery} label="Search trainings" placeholder="Title, lecturer or ID" /></div><Marker n={1} className="mb-2.5" /></div>
        <div className="flex items-end">
          <FilterChips legend="Status" value={status} onChange={setStatus} options={[{ value: "all", label: "All", count: count("all") }, ...STATUS_ORDER.map((s) => ({ value: s, label: statuses[s].label, count: count(s) }))]} />
          <Marker n={2} className="mb-1" />
        </div>
      </div>
      <p className="k-small k-muted" role="status" style={{ margin: "0 0 8px" }}>
        Showing {shown.length} of {rows.length} trainings{sort ? ` · sorted by ${columns.find((c) => c.key === sort.key)?.header.toLowerCase()}, ${sort.dir === "asc" ? "ascending" : "descending"}` : ""}<Marker n={3} />
      </p>
      {notice && <div className="mb-3"><Alert tone="success" focusRef={noticeRef}>{notice}</Alert></div>}
      <DataTable
        caption="Trainings"
        columns={columns}
        rows={shown}
        rowKey={(t) => t.id}
        sort={sort}
        onSort={setSort}
        empty={<><p style={{ margin: "0 0 8px" }}>No trainings match these filters.</p><Button variant="secondary" size="sm" onClick={() => { setQuery(""); setStatus("all"); }}>Clear filters</Button></>}
      />
      <div className="mt-2 flex justify-end"><Marker n={4} /></div>
      <Modal
        open={!!toCancel}
        onClose={() => setToCancel(null)}
        title={`Cancel “${toCancel?.title ?? ""}”?`}
        confirmLabel="Cancel training"
        cancelLabel="Keep training"
        tone="destructive"
        onConfirm={() => {
          if (!toCancel) return;
          setRows((r) => r.map((x) => (x.id === toCancel.id ? { ...x, status: "cancelled" } : x)));
          setNotice(`“${toCancel.title}” was cancelled. ${toCancel.registered ? `${toCancel.registered} registered participants would be notified.` : "No participants were registered."} (Demo – nothing was sent.)`);
        }}
      >
        <p style={{ margin: 0 }}>The training stays in the catalogue with the status Cancelled{toCancel?.registered ? `, and ${toCancel.registered} registered participants are notified` : ""}. This cannot be undone.</p>
      </Modal>
    </AppShell>
  );
}
