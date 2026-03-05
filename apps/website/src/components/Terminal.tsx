"use client";

interface TerminalLine {
  type?: "command" | "output" | "error" | "success" | "comment";
  prompt?: string;
  text: string;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  state?: "default" | "typing" | "success" | "error";
  scanline?: boolean;
}

export default function Terminal({
  title = "Terminal",
  lines,
  state = "default",
  scanline = false,
}: TerminalProps) {
  const stateClass = state !== "default" ? `terminal--${state}` : "";
  const scanlineClass = scanline ? "terminal--scanline" : "";

  return (
    <div className={`terminal ${stateClass} ${scanlineClass}`} role="log" aria-label={title}>
      <div className="terminal__titlebar">
        <div className="terminal__dots">
          <span className="terminal__dot terminal__dot--close" />
          <span className="terminal__dot terminal__dot--minimize" />
          <span className="terminal__dot terminal__dot--maximize" />
        </div>
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => (
          <div key={i} className="terminal__line">
            {line.prompt && (
              <span className="terminal__prompt">{line.prompt}</span>
            )}
            <span className={line.type ? `term-${line.type === "command" ? "cyan" : line.type === "error" ? "red" : line.type === "success" ? "green" : ""}` : ""}>
              {line.text}
            </span>
          </div>
        ))}
        {state === "typing" && <span className="terminal__cursor" />}
      </div>
    </div>
  );
}
