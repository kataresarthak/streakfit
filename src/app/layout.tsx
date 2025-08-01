import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StreakFit - Track Your Workout Consistency",
  description: "Build lasting fitness habits with StreakFit. Track your workout consistency and maintain your fitness streak with our intuitive workout tracker.",
  keywords: "fitness, workout tracker, consistency, streak, exercise, health",
  authors: [{ name: "StreakFit Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
