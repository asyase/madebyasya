export function Heading({ text, level = 2, id }: { text: string; level?: 2 | 3 | 4; id?: string }) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  return <Tag id={id} className="ds-heading">{text}</Tag>;
}

export function Text({ text, tone = "primary", size = "body", weight = "regular" }: { text: string; tone?: "primary" | "secondary"; size?: "caption" | "body" | "lead" | "title"; weight?: "regular" | "strong" }) {
  return <p className="ds-text" data-tone={tone} data-size={size} data-weight={weight}>{text}</p>;
}
