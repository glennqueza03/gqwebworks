import { useEffect } from "react";

export default function SuccessModal({ open, onClose, name }) {
  useEffect(() => {
    if (!open) return;

    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    const timer = setTimeout(onClose, 6000);

    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="success-modal-backdrop" onClick={onClose}>
      <div
        className="success-modal"
        role="alertdialog"
        aria-live="polite"
        aria-label="Message sent"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="success-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="success-check">
          <svg viewBox="0 0 52 52">
            <circle className="success-check-ring" cx="26" cy="26" r="23" />
            <path className="success-check-mark" d="M15 27 L23 35 L38 18" />
          </svg>
        </div>
        <h3>Message sent{name ? `, thanks ${name.split(" ")[0]}!` : "!"}</h3>
        <p>
          Your message is on its way. I'll get in touch as soon as possible —
          check your inbox for a confirmation email.
        </p>
      </div>
    </div>
  );
}
