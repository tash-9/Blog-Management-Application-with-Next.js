import { CATEGORIES } from "@/utils/constants";

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      aria-label="Filter by category"
      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>

      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
