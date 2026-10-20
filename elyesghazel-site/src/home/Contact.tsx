import { closing, contactNote, links, site } from "../content";
import { toast } from "../toast";

export default function Contact() {
  const [user, domain] = site.email.split("@");

  function copy() {
    const fallback = () => (window.location.href = `mailto:${site.email}`);
    if (!navigator.clipboard) return fallback();
    navigator.clipboard
      .writeText(site.email)
      .then(() => toast(`<b>${site.email}</b><br>Copied. Paste it into any mail app.`), fallback);
  }

  return (
    <>
      <p className="note rv">{contactNote}</p>
      <button type="button" className="mail rv" onClick={copy} aria-describedby="copyhint">
        <span className="u">{user}</span>
        <span className="at">@</span>
        <span className="u">{domain}</span>
      </button>
      <div className="copyhint" id="copyhint">
        Click to copy. Or <a href={`mailto:${site.email}`}>open your mail app</a>.
      </div>

      <div className="contact-rows rv">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer noopener">
            <small>{l.label}</small>
            <span>{l.value} ↗</span>
          </a>
        ))}
      </div>

      <p className="closing rv">
        {closing.text} <strong>{closing.strong}</strong>
      </p>
    </>
  );
}
