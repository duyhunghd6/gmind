import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gmind — Nền tảng Kỹ thuật Phần mềm Tác tử",
  description:
    "Trình diễn tương tác hệ thống Gmind Monorepo: Trí tuệ Mã nguồn, Theo dõi Phổ quát, Quy trình SAFe 6.0, và Hệ sinh thái Đa tác tử. Xây dựng cho kỷ nguyên Agentic SE 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="bg-blueprint" style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
