export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-text">
          © 2026 Gmind · Được xây dựng bằng{" "}
          <span style={{ color: "var(--accent-cyan)" }}>Agentic SE</span> bởi
          GSCfin
        </p>
        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/duyhunghd6/gmind"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="/architecture">Kiến trúc</a>
          </li>
          <li>
            <a href="/prompts">Prompts</a>
          </li>
          <li>
            <a href="/design-system">Design System</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
