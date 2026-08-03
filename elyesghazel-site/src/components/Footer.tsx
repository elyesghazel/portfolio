import { site } from "../content";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule py-8 text-sm text-faint md:mt-32">
      © {new Date().getFullYear()} {site.name}
    </footer>
  );
}
