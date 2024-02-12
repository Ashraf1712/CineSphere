import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineSphere",
  description: "Movies, TV Shows, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className="bg-neutral-900">
      <body>
        <Providers>
          {children}</Providers>
      </body>
    </html>
  )
}
