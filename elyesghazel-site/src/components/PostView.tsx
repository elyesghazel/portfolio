import { formatDate, posts, type Post } from "../markdown/load";
import Article from "./Article";
import Img from "./Img";
import Link from "../router";

export default function PostView({ post }: { post: Post }) {
  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <Article
      back={{ to: "/blog", label: "all posts" }}
      meta={
        <>
          <time dateTime={post.date} className="text-ink">
            {formatDate(post.date)}
          </time>{" "}
          · {post.minutes} min read
        </>
      }
      title={post.title}
      summary={post.summary}
      tags={post.tags}
      body={post.body}
      after={
        <>
          <p className="text-xs uppercase tracking-[var(--tracking-label)] text-faint">keep reading</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {older && <Next post={older} label="older" />}
            {newer && <Next post={newer} label="newer" />}
          </div>
          <p className="mt-6 text-sm">
            <Link to="/blog" className="link">
              all {posts.length} posts <span aria-hidden className="arr arr-r">&rarr;</span>
            </Link>
          </p>
        </>
      }
    />
  );
}

function Next({ post, label }: { post: Post; label: string }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card group flex gap-4 overflow-hidden p-3">
      <div className="cover aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--radius-1)]">
        {post.cover ? (
          <Img src={post.cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="cover-type min-h-0 p-2 text-sm">
            <span className="text-faint">//</span>
          </div>
        )}
      </div>
      <div className="min-w-0 py-1">
        <span className="text-xs text-faint">
          {label} · {formatDate(post.date)}
        </span>
        <span className="mt-1 line-clamp-2 block text-sm text-ink">
          <span className="link">{post.title}</span>
        </span>
      </div>
    </Link>
  );
}
