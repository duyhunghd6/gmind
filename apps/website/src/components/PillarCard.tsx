import SectionLabel from "./SectionLabel";

interface PillarCardProps {
  accent: "cyan" | "teal" | "amber" | "rose";
  label: string;
  title: string;
  description: string;
  codeSnippets?: string[];
}

export default function PillarCard({
  accent,
  label,
  title,
  description,
  codeSnippets,
}: PillarCardProps) {
  return (
    <div className={`ve-card ve-card--pillar accent-${accent}`}>
      <SectionLabel text={label} accent={accent} />
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "var(--text-dim)" }}>
        {description}
        {codeSnippets?.map((snippet, i) => (
          <code key={i} style={{ marginLeft: "4px" }}>
            {snippet}
          </code>
        ))}
      </p>
    </div>
  );
}
