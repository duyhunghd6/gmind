import { useId } from "react";

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
  const tooltipId = useId();
  return (
    <span className="tooltip-trigger" aria-describedby={tooltipId}>
      {children}
      <span className={`tooltip tooltip--${position}`} role="tooltip" id={tooltipId}>{text}</span>
    </span>
  );
}

