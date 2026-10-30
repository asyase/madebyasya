"use client";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import Icon from "./Icon";
import { Alert } from "./Feedback";
import type { IconName } from "@/lib/design-system/contracts";

/* ------------------------------------------------------------------ form */

type FieldEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type FormErrors = Record<string, { id: string; label: string; message: string }>;
const FormContext = createContext<FormErrors | null>(null);

/** Error text for one field, from native constraint validation plus minLength. */
function messageFor(el: FieldEl): string | null {
  const label = (el.dataset.label ?? el.name).toLowerCase();
  if (el.validity.valueMissing) {
    if (el instanceof HTMLInputElement && el.type === "checkbox") return "Tick this box to continue.";
    if (el instanceof HTMLSelectElement) return `Choose a ${label}.`;
    return `Enter your ${label}.`;
  }
  if (el instanceof HTMLInputElement && el.type === "email" && el.validity.typeMismatch) return "Enter an email address in the format name@example.com.";
  const min = "minLength" in el ? el.minLength : -1;
  if (min > 0 && el.value.length > 0 && el.value.length < min) return `Use at least ${min} characters – ${min - el.value.length} more to go.`;
  return null;
}

export function Form({ title, successMessage = "Submitted.", children }: { title?: string; successMessage?: string; children: React.ReactNode }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Move focus to the error summary after each failed submit (WCAG 3.3.1).
  useEffect(() => {
    if (status === "error") summaryRef.current?.focus();
  }, [status, attempt]);

  const fields = (form: HTMLFormElement) => Array.from(form.elements).filter((el): el is FieldEl => "name" in el && !!(el as FieldEl).name && !(el as FieldEl).disabled && "validity" in el);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FormErrors = {};
    for (const el of fields(e.currentTarget)) {
      const message = messageFor(el);
      if (message) next[el.name] = { id: el.id, label: el.dataset.label ?? el.name, message };
    }
    setErrors(next);
    setStatus(Object.keys(next).length ? "error" : "success");
    setAttempt((a) => a + 1);
  }

  // After a failed attempt, fields re-check as they are corrected – never before.
  function onChange(e: React.FormEvent<HTMLFormElement>) {
    const el = e.target as FieldEl;
    if (!el.name || !errors[el.name]) return;
    const message = messageFor(el);
    setErrors((prev) => {
      const copy = { ...prev };
      if (message) copy[el.name] = { ...copy[el.name], message };
      else delete copy[el.name];
      return copy;
    });
  }

  const list = Object.values(errors);
  return (
    <FormContext.Provider value={errors}>
      <form className="ds-form" noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby={title ? titleId : undefined}>
        {title && <h3 id={titleId} className="ds-heading">{title}</h3>}
        {status === "error" && list.length > 0 && (
          <Alert tone="danger" title={`Please fix ${list.length} ${list.length === 1 ? "field" : "fields"}`} focusRef={summaryRef}>
            <ul>
              {list.map((er) => (
                <li key={er.id}>
                  <a
                    href={`#${er.id}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(er.id)?.focus();
                    }}
                  >
                    {er.label}
                  </a>
                </li>
              ))}
            </ul>
          </Alert>
        )}
        {status === "success" && <Alert tone="success" text={successMessage} onDismiss={() => setStatus("idle")} />}
        {children}
      </form>
    </FormContext.Provider>
  );
}

/* ------------------------------------------------------------------ shared field parts */

type FieldState = "hover" | "focus";

function useFieldError(name: string, explicit?: string) {
  const ctx = useContext(FormContext);
  return explicit ?? ctx?.[name]?.message;
}

function FieldShell({ id, label, required, hint, error, size, disabled, forceState, children }: { id: string; label: string; required?: boolean; hint?: string; error?: string; size?: string; disabled?: boolean; forceState?: FieldState; children: React.ReactNode }) {
  return (
    <div className="ds-field" data-size={size} data-disabled={disabled || undefined} data-force-state={forceState}>
      <label className="ds-label" htmlFor={id}>
        {label}
        {required && <span className="ds-required" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <p className="ds-hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="ds-error" id={`${id}-error`}>
          <CircleAlert className="ds-icon" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

/* ------------------------------------------------------------------ fields */

export type TextFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  hint?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  multiline?: boolean;
  autoComplete?: string;
  iconStart?: IconName;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Controlled error (documentation); inside a Form errors come from validation. */
  error?: string;
  defaultValue?: string;
  forceState?: FieldState;
};

export function TextField({ name, label, type = "text", hint, placeholder, required, minLength, multiline, autoComplete, iconStart, size = "md", disabled, error: explicit, defaultValue, forceState }: TextFieldProps) {
  const id = `${useId()}-${name}`;
  const error = useFieldError(name, explicit);
  const common = {
    id,
    name,
    className: "ds-input",
    placeholder,
    required,
    minLength,
    disabled,
    defaultValue,
    autoComplete,
    "data-label": label,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, hint, error),
  };
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} size={size} disabled={disabled} forceState={forceState}>
      <div className="ds-control">
        {iconStart && !multiline && <Icon name={iconStart} />}
        {multiline ? <textarea {...common} rows={4} /> : <input {...common} type={type} />}
      </div>
    </FieldShell>
  );
}

export type SelectFieldProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: string;
  forceState?: FieldState;
};

export function SelectField({ name, label, options, placeholder, hint, required, size = "md", disabled, error: explicit, forceState }: SelectFieldProps) {
  const id = `${useId()}-${name}`;
  const error = useFieldError(name, explicit);
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} size={size} disabled={disabled} forceState={forceState}>
      <div className="ds-control">
        <select
          id={id}
          name={name}
          className="ds-input"
          required={required}
          disabled={disabled}
          defaultValue={placeholder ? "" : options[0]?.value}
          data-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="ds-icon ds-chevron" aria-hidden="true" />
      </div>
    </FieldShell>
  );
}

export function Checkbox({ name, label, required, disabled, defaultChecked, error: explicit }: { name: string; label: string; required?: boolean; disabled?: boolean; defaultChecked?: boolean; error?: string }) {
  const id = `${useId()}-${name}`;
  const error = useFieldError(name, explicit);
  return (
    <div className="ds-field">
      <label className="ds-check" htmlFor={id}>
        <input id={id} type="checkbox" name={name} required={required} disabled={disabled} defaultChecked={defaultChecked} data-label={label} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
        <span>
          {label}
          {required && <span className="ds-required" aria-hidden="true">*</span>}
        </span>
      </label>
      {error && (
        <p className="ds-error" id={`${id}-error`}>
          <CircleAlert className="ds-icon" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
