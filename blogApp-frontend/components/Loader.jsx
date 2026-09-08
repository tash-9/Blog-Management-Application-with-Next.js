export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
