"use client";
import { useEffect, useId, useRef } from "react";
import Button from "./Button";

/**
 * Base dialog on the native <dialog>: focus trap, Esc and inert background come
 * from the browser; focus returns to the element that opened it.
 */
export function Dialog({ open, onClose, title, description, children, width = "26rem" }: { open: boolean; onClose: () => void; title: string; description?: React.ReactNode; children?: React.ReactNode; width?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="k-modal"
      style={{ width: `min(${width}, calc(100vw - 2rem))` }}
      aria-labelledby={`${id}-t`}
      aria-describedby={description ? `${id}-d` : undefined}
      onClose={() => {
        onClose();
        if (opener.current instanceof HTMLElement && opener.current.isConnected) opener.current.focus();
      }}
    >
      <h2 id={`${id}-t`} className="k-h2">{title}</h2>
      {description && <div id={`${id}-d`} className="k-muted" style={{ marginTop: 8 }}>{description}</div>}
      {children}
    </dialog>
  );
}

/** Confirmation dialog built on Dialog. Use tone="destructive" for irreversible actions. */
export default function Modal({ open, onClose, onConfirm, title, children, confirmLabel, cancelLabel = "Cancel", tone = "primary" }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; children: React.ReactNode; confirmLabel: string; cancelLabel?: string; tone?: "primary" | "destructive" }) {
  return (
    <Dialog open={open} onClose={onClose} title={title} description={children}>
      <div className="k-modal__actions">
        <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
        <Button variant={tone} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}
