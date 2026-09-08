import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ href, label = "Back" }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-primary"
    >
      <ArrowLeft size={15} />
      {label}
    </Link>
  );
}