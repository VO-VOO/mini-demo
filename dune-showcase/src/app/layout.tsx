import type { Metadata } from "next";
import { Barlow, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Codex | 工程代理",
  description: "一个以玻璃拟态风格展示 Codex 的中文 landing page，强调 repo-aware 的工程执行能力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${instrumentSerif.variable} ${barlow.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
