import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, onCancel, onConfirm, pending }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="animate-fade-in w-full max-w-sm rounded-2xl bg-white p-6 shadow-card-hover">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-error">
          <AlertTriangle size={20} />
        </span>

        <h2 className="mt-4 text-lg font-bold text-ink">Delete this blog?</h2>

        <p className="mt-1.5 text-sm text-slate-500">
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button className="button-secondary" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="button-danger"
            disabled={pending}
            onClick={onConfirm}
          >
            {pending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
