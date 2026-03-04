"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block">
      {title && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent-cyan)",
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {language && <span style={{ opacity: 0.6 }}>{language} · </span>}
          {title}
        </div>
      )}
      <button
        className={`copy-btn ${copied ? "copied" : ""}`}
        onClick={handleCopy}
      >
        {copied ? "✓ Đã sao chép" : "Sao chép"}
      </button>
      <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
