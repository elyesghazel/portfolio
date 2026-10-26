import { closing, contactNote, links, site } from "../content";
import { toast } from "../toast";

export default function Contact() {
  const [user, domain] = site.email.split("@");

  function copy() {
    const fallback = () => (window.location.href = `mailto:${site.email}`);
    if (!navigator.clipboard) return fallback();
    navigator.clipboard
      .writeText(site.email)
      .then(() => toast(`<b>${site.email}</b>Copied. Paste it into any mail app.`), fallback);
  }

  return (
    <>
      <div className="contact rv">
        <div className="main">
          <p className="note">{contactNote}</p>
          <button type="button" className="mail" onClick={copy} aria-describedby="copyhint">
            <span className="u">{user}</span>
            <span className="at">@</span>
            <span className="u">{domain}</span>
          </button>
          <p className="copyhint" id="copyhint">
            Click the address to copy it.
          </p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${site.email}`}>
              Write an email <span className="arr" aria-hidden>→</span>
            </a>
            <button type="button" className="btn" onClick={copy}>
              Copy address
            </button>
          </div>
        </div>
        <div className="rows">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer noopener">
              <small>{l.label}</small>
              <span>{l.value} ↗</span>
            </a>
          ))}
        </div>
      </div>

      <p className="closing rv">
        {closing.text} <strong>{closing.strong}</strong>
      </p>
    </>
  );
}
