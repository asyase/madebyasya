"use client";
import { forwardRef, useId } from "react";
import { ChevronDown, CircleAlert, type LucideIcon } from "lucide-react";

type Common = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Mark optional fields instead of required ones when most fields are required. */
  optional?: boolean;
  disabled?: boolean;
  forceState?: "hover" | "focus";
};

function Shell({ id, label, hint, error, required, optional, disabled, forceState, children }: Common & { id: string; children: React.ReactNode }) {
  return (
    <div className="k-field" data-force={forceState} data-disabled={disabled || undefined}>
      <label className="k-label" htmlFor={id}>
        {label}
        {required && <span className="k-req" aria-hidden>*</span>}
        {optional && <span className="k-opt">(optional)</span>}
      </label>
      {children}
      {hint && <p className="k-hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="k-error" id={`${id}-error`}>
          <CircleAlert className="k-icon" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) => [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;

export type InputProps = Common & {
  type?: "text" | "email" | "tel" | "date" | "search" | "number";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  autoComplete?: string;
  icon?: LucideIcon;
  multiline?: boolean;
  onChange?: (v: string) => void;
  onBlur?: () => void;
};

/** One field pattern: persistent label, optional hint, error text linked with aria-describedby. */
export const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(function Input(
  { label, name, hint, error, required, optional, disabled, forceState, type = "text", placeholder, value, defaultValue, autoComplete, icon: Icon, multiline, onChange, onBlur },
  ref,
) {
  const id = `${useId()}-${name}`;
  const props = {
    id,
    name,
    ref,
    className: "k-input",
    placeholder,
    value,
    defaultValue,
    autoComplete,
    disabled,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, hint, error),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange?.(e.target.value),
    onBlur,
  };
  return (
    <Shell id={id} label={label} name={name} hint={hint} error={error} required={required} optional={optional} disabled={disabled} forceState={forceState}>
      <div className="k-control">
        {Icon && !multiline && <Icon className="k-icon" aria-hidden />}
        {multiline ? <textarea {...props} rows={4} /> : <input {...props} type={type} />}
      </div>
    </Shell>
  );
});

export type SelectProps = Common & { options: { value: string; label: string }[]; placeholder?: string; value?: string; onChange?: (v: string) => void };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, name, hint, error, required, optional, disabled, forceState, options, placeholder, value, onChange }, ref) {
  const id = `${useId()}-${name}`;
  return (
    <Shell id={id} label={label} name={name} hint={hint} error={error} required={required} optional={optional} disabled={disabled} forceState={forceState}>
      <div className="k-control">
        <select
          ref={ref}
          id={id}
          name={name}
          className="k-input"
          value={value}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="k-icon k-chev" aria-hidden />
      </div>
    </Shell>
  );
});

export const Checkbox = forwardRef<HTMLInputElement, { label: React.ReactNode; name: string; checked?: boolean; onChange?: (v: boolean) => void; error?: string; required?: boolean; disabled?: boolean }>(function Checkbox(
  { label, name, checked, onChange, error, required, disabled },
  ref,
) {
  const id = `${useId()}-${name}`;
  return (
    <div className="k-field">
      <label className="k-check" htmlFor={id}>
        <input ref={ref} id={id} type="checkbox" name={name} checked={checked} disabled={disabled} required={required} onChange={(e) => onChange?.(e.target.checked)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
        <span>
          {label}
          {required && <span className="k-req" aria-hidden>*</span>}
        </span>
      </label>
      {error && (
        <p className="k-error" id={`${id}-error`}>
          <CircleAlert className="k-icon" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
});
