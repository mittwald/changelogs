import Markdoc, { type Node, type Config } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import { products, type Product } from "./products";

const reader = createReader(process.cwd(), keystaticConfig);

const markdocConfig = {
  nodes: {
    link: {
      attributes: Markdoc.nodes.link.attributes,
      transform(node: Node, config: Config) {
        return new Markdoc.Tag(
          "a",
          {
            ...node.transformAttributes(config),
            target: "_blank",
            rel: "noopener noreferrer",
          },
          node.transformChildren(config),
        );
      },
    },
  },
};

export interface ChangelogEntry {
  slug: string;
  title: string;
  date: string;
  markdown: string;
  html: string;
}

export interface ChangelogSection {
  key: string;
  label: string;
  entries: ChangelogEntry[];
}

export function isProductKey(value: string): boolean {
  return products.some((product) => product.key === value);
}

async function buildSection(product: Product): Promise<ChangelogSection> {
  const items = await reader.collections[product.key].all();
  const entries = await Promise.all(
    items.map(async (item) => {
      const { node } = await item.entry.content();
      return {
        slug: item.slug,
        title: item.entry.title,
        date: item.entry.date ?? "",
        markdown: Markdoc.format(node),
        html: Markdoc.renderers.html(Markdoc.transform(node, markdocConfig)),
      };
    }),
  );
  entries.sort((a, b) => b.date.localeCompare(a.date));
  return { key: product.key, label: product.label, entries };
}

export function getSections(): Promise<ChangelogSection[]> {
  return Promise.all(products.map(buildSection));
}

export function getSection(key: string): Promise<ChangelogSection> {
  const product = products.find((entry) => entry.key === key);
  if (!product) {
    throw new Error(`Unbekanntes Produkt: ${key}`);
  }
  return buildSection(product);
}
