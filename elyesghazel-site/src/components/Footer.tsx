import { site } from "../content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.location}</span>
        <span>rev 2026.10</span>
        <a href="#top">back to top ↑</a>
      </div>
    </footer>
  );
}
