// @ts-nocheck
import type { Metadata } from "next";
import "./globals.css";
import { SmartHealthProvider } from "@/context/SmartHealthContext";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "SmartHealth — Sistem Antrean & EMR Terpadu RSUD Dr. H. Abdul Moeloek Provinsi Lampung",
  description: "Platform Antrean & Rekam Medis Elektronik Terpadu RSUDAM Provinsi Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://googleapis.com" />
        <link rel="preconnect" href="https://gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased min-h-screen">
        {/* Header dipasang di sini agar muncul di bagian paling atas halaman */}
        <Header />

        <SmartHealthProvider>
          {children}
        </SmartHealthProvider>
      </body>
    </html>
  );
}

