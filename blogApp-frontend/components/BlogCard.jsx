import Link from "next/link";
import { ArrowRight } from "lucide-react";

const imageUrl = (user) => user?.profileImage || user?.image || user?.avatar;

export default function BlogCard({ blog }) {
  const id = blog._id || blog.id;
  const author = blog.author || blog.user || {};
  const title = blog.blogTitle || blog.title;

  return (
    <article className="card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="badge-category">
          {blog.category || "Uncategorized"}
        </span>

        <time className="text-xs font-medium text-slate-400">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </time>
      </div>

      <h2 className="text-lg font-bold leading-snug text-ink transition group-hover:text-primary">
        <Link href={`/blogs/${id}`}>{title}</Link>
      </h2>

      <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-500">
        {blog.blog || blog.content}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-700">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-xs font-semibold text-primary">
            {imageUrl(author) ? (
              <img
                src={imageUrl(author)}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              (author.firstname || "A").charAt(0).toUpperCase()
            )}
          </div>

          <span className="truncate">
            {[author.firstname, author.lastname].filter(Boolean).join(" ") ||
              author.name ||
              "Unknown author"}
          </span>
        </div>

        <Link
          href={`/blogs/${id}`}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
        >
          Read
          <ArrowRight
            size={14}
            className="transition group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
