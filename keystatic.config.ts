import { config, fields, collection } from "@keystatic/core";

const changelogSchema = (folder: string) =>
  collection({
    label: folder === "mstudio" ? "mStudio" : "Nexus",
    slugField: "title",
    path: `src/content/${folder}/*`,
    format: { contentField: "content", data: "yaml" },
    columns: ["title", "date"],
    schema: {
      title: fields.slug({ name: { label: "Titel" } }),
      date: fields.date({
        label: "Datum",
        defaultValue: { kind: "today" },
        validation: { isRequired: true },
      }),
      content: fields.markdoc({
        label: "Beschreibung",
        extension: "md",
        options: {
          bold: true,
          italic: true,
          code: true,
          link: true,
          orderedList: true,
          unorderedList: true,
          codeBlock: true,
          heading: false,
          strikethrough: false,
          blockquote: false,
          table: false,
          image: false,
          divider: false,
        },
      }),
    },
  });

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Changelogs" },
  },
  collections: {
    mstudio: changelogSchema("mstudio"),
    nexus: changelogSchema("nexus"),
  },
});
