import { formatDate, posts, type Post } from "../markdown/load";
import Link from "../router";
import Img from "./Img";

/** The cover image, or the post's first tag set large when there is none. */
function Cover({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`cover ${className}`}>
      {post.cover ? (
        <Img
          src={post.cover}
          alt=""
          className="block h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="cover-type">
          <span className="text-faint">//</span>
          <span>{post.tags[0] ?? "notes"}</span>
        </div>
      )}
    </div>
  );
}

/** Hero side panel: the newest post, so the blog is visible without scrolling. */
export function LatestPost() {
  const post = posts[0];
  if (!post) return null;

  return (
    <aside aria-label="Newest post">
      <p className="flex items-center gap-2.5 text-xs uppercase tracking-[var(--tracking-label)] text-faint">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        new on the blog
      </p>
      <Link to={`/blog/${post.slug}`} className="card group mt-4 block overflow-hidden">
        <Cover post={post} className="aspect-[16/9] border-b border-rule" />
        <div className="p-5">
          <p className="text-xs text-faint tabular-nums">
            {formatDate(post.date)} · {post.minutes} min
          </p>
          <p className="mt-2 text-[length:var(--fs-lg)] leading-snug text-ink">
            <span className="link">{post.title}</span>
          </p>
          <p className="mt-2 line-clamp-3 text-sm text-dim">{post.summary}</p>
        </div>
      </Link>
      <Link to="/#blog" className="mt-3 inline-block text-sm text-dim hover:text-ink">
        {posts.length} posts <span aria-hidden className="arr arr-d">&darr;</span>
      </Link>
    </aside>
  );
}

/** Home page writing section: posts as a grid of cards, each with a cover. */
export default function Writing() {
  const shown = posts.slice(0, 6);
  const [first, ...rest] = shown;
  if (!first) return null;

  return (
    <>
      <Link to={`/blog/${first.slug}`} className="rv card group grid overflow-hidden md:grid-cols-2">
        <Cover post={first} className="aspect-[16/10] border-b border-rule md:aspect-auto md:min-h-72 md:border-b-0 md:border-r" />
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs text-faint tabular-nums">
            latest · {formatDate(first.date)} · {first.minutes} min read
          </p>
          <h3 className="mt-3 text-[length:var(--fs-xl)] leading-[var(--lh-tight)] tracking-tight text-ink">
            <span className="link">{first.title}</span>
          </h3>
          <p className="mt-4 text-dim">{first.summary}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {first.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {rest.map((post) => (
          <li key={post.slug} className="rv">
            <Link to={`/blog/${post.slug}`} className="card group flex h-full flex-col overflow-hidden">
              <Cover post={post} className="aspect-[16/8] border-b border-rule" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-faint tabular-nums">
                  {formatDate(post.date)} · {post.minutes} min
                </p>
                <p className="mt-2 leading-snug text-ink">
                  <span className="link">{post.title}</span>
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-dim">{post.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm">
        <Link to="/blog" className="link">
          all {posts.length} posts <span aria-hidden className="arr arr-r">&rarr;</span>
        </Link>
      </p>
    </>
  );
}
