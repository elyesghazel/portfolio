import { toast } from "../../lib/toast";

export default function Copy({ text, label = "copy" }: { text: string; label?: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast("copied to clipboard");
    } catch {
      toast("couldn't copy, select it instead");
    }
  }
  return (
    <button type="button" onClick={copy} className="md-copy">
      {label}
    </button>
  );
}
