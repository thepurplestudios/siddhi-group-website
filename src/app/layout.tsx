import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Noto_Serif_Gujarati,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const gujarati = Noto_Serif_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siddhi Group | Builders & Developers",
  description:
    "Siddhi Group — creating thoughtfully designed spaces across Rajkot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} ${gujarati.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
