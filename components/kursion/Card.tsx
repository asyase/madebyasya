import { useId } from "react";

/** Surface for one group of content. A title makes it a labelled region. */
export default function Card({ title, description, actions, padding = "lg", as: Tag = "section", headingLevel = 2, children }: { title?: string; description?: string; actions?: React.ReactNode; padding?: "sm" | "lg"; as?: "section" | "article" | "div"; headingLevel?: 2 | 3; children?: React.ReactNode }) {
  const id = useId();
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <Tag className="k-card" data-pad={padding} aria-labelledby={title ? id : undefined}>
      {(title || actions) && (
        <div className="k-card__head">
          <div>
            {title && <H id={id} className={headingLevel === 2 ? "k-h2" : "k-h3"}>{title}</H>}
            {description && <p className="k-muted k-small" style={{ margin: "2px 0 0" }}>{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </Tag>
  );
}
