interface SectionLabelProps {
  text: string;
  accent?: "cyan" | "teal" | "amber" | "rose";
}

export default function SectionLabel({
  text,
  accent = "cyan",
}: SectionLabelProps) {
  return <div className={`section-label accent-${accent}`}>{text}</div>;
}
