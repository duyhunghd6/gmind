"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/architecture", label: "Kiến trúc" },
  { href: "/prompts", label: "Prompts" },
  { href: "/research", label: "Nghiên cứu" },
  { href: "/design-system", label: "Design System" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar glass" aria-label="Điều hướng chính">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <span className="brand-dot" />
          gmind
        </Link>

        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/duyhunghd6/gmind"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
