import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        aria-label="Search blogs"
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-100"
        placeholder="Search blogs by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
