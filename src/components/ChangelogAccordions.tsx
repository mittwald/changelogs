import { useEffect, useState, type FC } from "react";
import {
  Accordion,
  AccordionGroup,
  Badge,
  Content,
  Heading,
} from "@mittwald/flow-react-components";
import "@mittwald/flow-react-components/all.css";
import styles from "./Changelog.module.css";

export interface AccordionEntry {
  slug: string;
  title: string;
  /** Already formatted for display. */
  date: string;
  /**
   * The entry's body, rendered to HTML on the server (Flow Markdown). Keeps
   * the markdown renderer out of the browser bundle.
   */
  html: string;
}

/** All entries in one AccordionGroup; the newest starts expanded. */
export const ChangelogAccordions: FC<{ entries: AccordionEntry[] }> = ({
  entries,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(entries.slice(0, 1).map((e) => e.slug)),
  );

  // A link to an entry (#slug) opens it and scrolls to it.
  useEffect(() => {
    const openHashTarget = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!entries.some((e) => e.slug === slug)) {
        return;
      }
      setExpanded((keys) => new Set(keys).add(slug));
      requestAnimationFrame(() =>
        document.getElementById(slug)?.scrollIntoView(),
      );
    };

    openHashTarget();
    window.addEventListener("hashchange", openHashTarget);
    return () => window.removeEventListener("hashchange", openHashTarget);
  }, [entries]);

  return (
    <AccordionGroup expandedKeys={expanded} onExpandedChange={setExpanded}>
      {entries.map((entry, index) => (
        // Flow renders the accordion's `id` on its element: the jump target.
        <Accordion key={entry.slug} id={entry.slug} className={styles.entry}>
          <Heading level={2} size="s">
            <span className={styles.entryTitle}>
              <span>
                {entry.title}
                {index === 0 && (
                  <span className={styles.badge}>
                    <Badge color="violet">Neu</Badge>
                  </span>
                )}
              </span>
              <span className={styles.date}>{entry.date}</span>
            </span>
          </Heading>
          <Content>
            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
          </Content>
        </Accordion>
      ))}
    </AccordionGroup>
  );
};

export default ChangelogAccordions;
