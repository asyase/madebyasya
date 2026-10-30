"use client";
import { useEffect, useId, useRef } from "react";
import Button from "./Button";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  text: string;
  confirmLabel: string;
  cancelLabel?: string;
};

/**
 * Native <dialog> opened with showModal(): the browser makes the page behind it
 * inert, traps focus inside and closes on Esc. Focus returns to the trigger.
 */
export default function Dialog({ open, onClose, onConfirm, title, text, confirmLabel, cancelLabel = "Cancel" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const id = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="ds-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      onClose={() => {
        onClose();
        if (opener.current instanceof HTMLElement) opener.current.focus();
      }}
    >
      <h2 id={`${id}-title`} className="ds-heading">{title}</h2>
      <p id={`${id}-text`} className="ds-text" data-tone="secondary" style={{ marginTop: "var(--ds-spacing-component-sm)" }}>{text}</p>
      <div className="ds-dialog__actions">
        <Button label={cancelLabel} variant="outline" onClick={() => ref.current?.close()} />
        <Button
          label={confirmLabel}
          onClick={() => {
            onConfirm?.();
            ref.current?.close();
          }}
        />
      </div>
    </dialog>
  );
}
