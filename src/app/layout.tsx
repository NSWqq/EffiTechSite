import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EffiCore - Автоматизация бизнес-процессов",
  description: "Автоматизация, умножающая эффективность. Индивидуальные системы автоматизации для вашего бизнеса. Автоматизация Telegram, интеграция ИИ и полный цикл разработки.",
  keywords: "автоматизация бизнеса, индивидуальные системы автоматизации, интеграция ИИ, Telegram-боты, бизнес-процессы, EffiCore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
