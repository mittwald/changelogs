import type { FC, ReactNode } from "react";
import {
  Flex,
  Heading,
  LayoutCard,
  Link,
  Markdown,
  TabNavigation,
} from "@mittwald/flow-react-components";
import "@mittwald/flow-react-components/all.css";
import type { ChangelogEntry } from "../lib/changelogs";
import type { Product } from "../lib/products";
import styles from "./Changelog.module.css";

const dateFormat = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" });

export const formatDate = (iso: string) =>
  iso ? dateFormat.format(new Date(iso)) : "";

/*
 * Keystatic writes hard line breaks as a trailing backslash, and an empty line
 * as a line holding only a backslash. Breaks in a row become a paragraph
 * break, and at the end of a paragraph, where CommonMark would render the
 * backslash literally, the break is dropped.
 */
const cleanMarkdown = (markdown: string) =>
  markdown
    .replace(/\\\n(?:\\\n)+/g, "\n\n")
    .replace(/\\\n(?=[ \t]*(\n|$))/g, "\n")
    .replace(/\\$/, "");

/** The body of an entry; rendered to HTML on the server only. */
export const ChangelogEntryBody: FC<{ entry: ChangelogEntry }> = ({
  entry,
}) => (
  <Markdown className={styles.markdown}>
    {cleanMarkdown(entry.markdown)}
  </Markdown>
);

/**
 * Page frame: content header above the card, as in Flow's page templates.
 * With several products, a TabNavigation opens the card. It has to be
 * rendered here, inside the LayoutCard's own React tree: the card styles its
 * TabNavigation through React context, which slot content from Astro misses.
 */
export const ChangelogPage: FC<{
  title: string;
  products: Product[];
  current: string;
  children: ReactNode;
}> = ({ title, products, current, children }) => (
  <Flex direction="column" gap="m" className={styles.page}>
    <Heading level={1} color="dark">
      {title}
    </Heading>
    <LayoutCard>
      {products.length > 1 && (
        <ProductNavigation products={products} current={current} />
      )}
      {children}
    </LayoutCard>
  </Flex>
);

/** The URL of a product's changelog: the first product lives at `/`. */
const productPath = (products: Product[], key: string) =>
  key === products[0]?.key ? "/" : `/${key}`;

/** Several products: one page per product, linked by a TabNavigation. */
const ProductNavigation: FC<{
  products: Product[];
  current: string;
}> = ({ products, current }) => (
  <TabNavigation aria-label="Produkte">
    {products.map((product) => (
      <Link
        key={product.key}
        href={productPath(products, product.key)}
        aria-current={product.key === current ? "page" : undefined}
      >
        {product.label}
      </Link>
    ))}
  </TabNavigation>
);
