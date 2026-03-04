interface TooltipProps {
  text: string;
  position?: "top" | "bottom";
  children: React.ReactNode;
}

export default function Tooltip({
  text,
  position = "top",
  children,
}: TooltipProps) {
  return (
    <span className="tooltip-trigger">
      {children}
      <span className={`tooltip tooltip--${position}`}>{text}</span>
    </span>
  );
}
