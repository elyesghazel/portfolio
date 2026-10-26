import { posts } from "../markdown/load";
import Header from "./Header";
import Footer from "./Footer";
import PostList from "./PostList";
import Link from "../router";

export default function BlogIndex() {
  return (
    <div id="top" className="min-h-screen">
      <Header variant="project" />
      <main className="mx-auto max-w-[var(--measure)] px-6 pb-4">
        <section className="pt-12 md:pt-20">
          <Link to="/" className="text-sm text-dim transition-colors hover:text-ink">
            <span aria-hidden>&larr;</span> home
          </Link>
          <p className="section-label mt-10">
            <span className="slashes" aria-hidden>
              //
            </span>
            blog
            <span className="aside">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </p>
          <h1 className="mt-6 text-[length:var(--fs-2xl)] leading-[var(--lh-tight)] tracking-tight text-ink">
            Notes from the workbench
          </h1>
          <p className="mt-5 max-w-[34rem] text-[length:var(--fs-md)] leading-relaxed">
            Write-ups of things I set up, built or broke. Mostly self-hosting, hardware and the
            tools around them.
          </p>
          <div className="mt-12">
            <PostList posts={posts} />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
