import { config, fields, collection } from "@keystatic/core";
import { products } from "./src/lib/products";

const changelogSchema = (folder: string, label: string) =>
  collection({
    label,
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
  storage: {
    kind: "github",
    repo: "mittwald/changelogs",
  },
  ui: {
    brand: { name: "Changelogs" },
  },
  collections: Object.fromEntries(
    products.map((product) => [
      product.key,
      changelogSchema(product.key, product.label),
    ]),
  ),
});
