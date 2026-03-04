interface BadgeProps {
  accent?: "cyan" | "teal" | "amber" | "rose";
  children: React.ReactNode;
}

export default function Badge({ accent = "cyan", children }: BadgeProps) {
  return <span className={`badge badge-${accent}`}>{children}</span>;
}
