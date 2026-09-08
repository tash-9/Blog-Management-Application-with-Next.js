import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={22} />
      </span>

      <p className="font-semibold text-slate-600">{title}</p>

      {description && (
        <p className="max-w-xs text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}
