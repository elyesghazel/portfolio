const modules = import.meta.glob("./projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type Project = {
  id: string;
  title: string;
  type: "private" | "swisscom";
  role: string;
  date: string;
  duration?: string;
  tags: string[];
  shortDescription: string;
  markdown: string;
};

export const projects: Project[] = Object.entries(modules).map(
  ([path, content]) => {
    const rawContent = content as string;
    const id = path.split("/").pop()?.replace(".md", "") || "";

    // frontmatter regex parser to split ---
    const match = rawContent.match(
      /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,
    );

    if (!match) {
      return {
        id,
        title: id,
        type: "private",
        role: "",
        date: "",
        tags: [],
        shortDescription: "",
        markdown: rawContent,
      };
    }

    const yamlBlock = match[1];
    const markdownBody = match[2];

    const metadata: any = {};
    yamlBlock.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        const value = valueParts
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "");

        if (value.startsWith("[") && value.endsWith("]")) {
          metadata[key.trim()] = value
            .slice(1, -1)
            .split(",")
            .map((t) => t.trim().replace(/^["']|["']$/g, ""));
        } else {
          metadata[key.trim()] = value;
        }
      }
    });

    return {
      id,
      title: metadata.title || id,
      type: metadata.type || "private",
      role: metadata.role || "",
      date: metadata.date || "",
      duration: metadata.duration || "",
      tags: metadata.tags || [],
      shortDescription: metadata.shortDescription || "",
      markdown: markdownBody,
    };
  },
);
