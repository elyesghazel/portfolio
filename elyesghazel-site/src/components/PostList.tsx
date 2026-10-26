import { formatDate, type Post } from "../markdown/load";
import Link from "../router";

/** Posts as rows: date on the left, title and summary on the right. */
export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ol className="border-t border-rule">
      {posts.map((post) => (
        <li key={post.slug} className="rv border-b border-rule">
          <Link
            to={`/blog/${post.slug}`}
            className="group -mx-3 grid grid-cols-1 gap-x-6 gap-y-1 px-3 py-5 transition-colors hover:bg-hover sm:grid-cols-[7.5rem_1fr]"
          >
            <span className="text-sm text-faint tabular-nums sm:pt-0.5">{formatDate(post.date)}</span>
            <span className="min-w-0">
              <span className="text-ink">
                <span className="link">{post.title}</span>{" "}
                <span aria-hidden className="arr arr-r text-faint group-hover:text-ink">
                  &rarr;
                </span>
              </span>
              <span className="mt-1.5 block text-sm text-dim">{post.summary}</span>
              <span className="mt-3 flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
                <span className="ml-1 text-xs text-faint">{post.minutes} min read</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
