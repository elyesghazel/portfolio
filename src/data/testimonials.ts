// src/data/testimonials.ts

export interface Testimonial {
  author: string;
  role: string;
  content: string;
  accentColor: string;
}

const modules = import.meta.glob("./recommendations/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const testimonials: Testimonial[] = Object.entries(modules).map(
  ([_, content]) => {
    const rawContent = content as string;

    const match = rawContent.match(
      /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,
    );

    if (!match) {
      return {
        author: "Unknown",
        role: "",
        accentColor: "border-white/10",
        content: rawContent,
      };
    }

    const yamlBlock = match[1];
    const markdownBody = match[2];

    const metadata: any = {};
    yamlBlock.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "");
      }
    });

    const pureColor =
      metadata.color?.replace("border-", "").split("/")[0] || "blue-500";

    return {
      author: metadata.author || "Unknown",
      role: metadata.role || "",
      accentColor: pureColor,
      content: markdownBody.trim(),
    };
  },
);
