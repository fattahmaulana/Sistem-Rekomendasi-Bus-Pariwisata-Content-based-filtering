import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BusGo - Sistem Rekomendasi Bus Pariwisata",
  description: "Content-Based Filtering untuk rekomendasi bus pariwisata terbaik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
